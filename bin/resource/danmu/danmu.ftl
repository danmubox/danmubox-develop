<script id="template-danmu" type="text/html">
    <?xml version="1.0" encoding="UTF-8"?>
<i>
    <chatserver>{{chatServer}}</chatserver>
    <chatid>{{chatId}}</chatid>
    <count>{{items.length}}</count>
    {{#items}}
    <d p="{{playTime}},{{type}},{{size}},{{color}},{{createTime}},{{pool}},{{uid}},{{historyId}}">{{content}}</d>
    {{/items}}
</i>
</script>