<script id="template-ass" type="text/html">
[Script Info]
Title: {{script.title}}
ChatServer: {{script.chatServer}}
ChatId: {{script.chatId}}
Count: {{events.length}}
ScriptType: v4.00+
PlayResX: {{script.playResX}}
PlayResY: {{script.playResY}}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: {{style.name}},{{style.fontName}},{{style.fontSize}},&H{{style.alpha}}{{style.fontColor}},&H{{style.alpha}}FFFFFF,&H{{style.alpha}}000000,&H{{style.alpha}}000000,{{#style.bold}}-1{{/style.bold}}{{^style.bold}}0{{/style.bold}},0,0,0,100,100,0,0,1,1,0,2,20,20,2,0

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
{{#events}}
Dialogue: {{layer}},{{start}},{{end}},{{style.name}},,69,69,5,,{\{{effect.value}}{{#effect.fontSize}}\fs{{effect.fontSize}}{{/effect.fontSize}}{{#effect.fontColor}}\c&H{{effect.fontColor}}{{/effect.fontColor}}}{{text}}
{{/events}}
</script>