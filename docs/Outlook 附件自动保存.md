---
title: "OutLook 附件自动保存"
output: html_document
toc: false
mainfont: msyh
use_math: true
categories: [计算机]
tags: [outlook,vba,IT]
---
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />


# Outlook 附件自动保存

我们希望实现的功能是自动保存Outlook的一些附件，保存的依据应该是邮件的主题和文件的文件名，目标可以是不同的文件夹。进行如下设置：

## vba
首先在Outlook中`alt+F11`打开代码编辑器，在 **Microsoft Outlook 对象/ThisOutlookSession** 下加入如下代码。
``` vb
Public Sub saveAttTo(item As Outlook.MailItem)
    Dim objAtt As Outlook.Attachment
    Dim fso As Object
    Dim ts As Object
    
    Set fso = CreateObject("Scripting.FileSystemObject")
    confFile = Environ("AppData") & "\outlookAttSaver\config.txt"
    Debug.Print "confFile at: " & confFile
    
On Error GoTo noConfFile
    Set ts = fso.OpenTextFile(confFile, 1)
    
    Dim ThisLine As String
    Dim rule() As String

On Error Resume Next
    Do Until ts.AtEndOfStream
        ThisLine = ts.ReadLine
        Debug.Print "rule is: " & ThisLine
        rule = Split(ThisLine, ";")
        
        If UBound(rule) < 1 Then
            rule(1) = "*"
        End If
        
        If UBound(rule) < 2 Then
            rule(2) = ""
        End If
        
        
        For Each objAtt In item.Attachments
            If (rule(1) = "*" Or InStr(objAtt.fileName, rule(1))) And InStr(item.subject, rule(2)) Then
                objAtt.SaveAsFile rule(0) & "\" & objAtt.DisplayName
                Debug.Print objAtt.DisplayName & " saved to " & rule(0)
                If UBound(rule) = 3 Then
                    If rule(3) Then
                        Dim ws As Object
                        Set ws = CreateObject("WScript.Shell")
                        ws.popup objAtt.DisplayName & " saved to " & rule(0), 3, "Outllook 附件保存"
                    End If
                End If
            End If

        Next
    Loop
    ts.Close
Exit Sub


noConfFile:
    MsgBox ("没有配置，请在" & confFile & "配置，格式每行为：目标文件夹;文件名包含|*;主题包含 或 空")

End Sub
```

## Outlook
Outlook 要用规则来实现，参见[outlook使用python一文](outlook-python.md#Outlook规则的准备)。

## 配置
简单点，就用一个txt文件来实现吧，文件为 'C:\Users\[username]\AppData\Roaming\outlookAttSaver\config.txt'。每行一个配置。行内用';'分隔参数
```
保存文件夹;附件名匹配;邮件主题匹配;是否弹出提示
```
* 附件将被保存到*保存文件夹*里
* 附件名如果是空或是'*'，表示匹配所有的附件，是文本匹配文件名包含该文本的
* 没有第三个参数或是空，表示匹配所有主题
* 第四个参数如果不是0，则保存后会有一个弹窗提示
例如：
```
D:\C临时\testSaver\;*;有文件
D:\C临时\testSaver\in;跨境;有文件;1
```
第一行把主题含"有文件"字符串的邮件的所有附件保存到"D:\C临时\testSaver\"文件夹下。第二行把主题含"有文件"字符串的邮件中文件名含"跨境"的文件存到"D:\C临时\testSaver\in"文件夹下，且弹窗提示。
