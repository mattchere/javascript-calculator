$(document).ready(function() {
    var strings = {
        divi: "&div;",
        mult: "&times;",
        subt: "&minus;",
        add: "&plus;",
        point: "&point;",
        zero: "0",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9"
    }
    function showSymbol(symbol) {
        $(".symbol p").html(symbol);
    }
    var currSymbol = ""
    $(".btn").click(function(event) {
        var id = event.currentTarget.id;
        if (id === "ac" || id === "ce") {
            currSymbol = "";
            showSymbol("0");
        }
        else {
            if (currSymbol === strings["mult"] || currSymbol === strings["divi"] || currSymbol === strings["subt"] || currSymbol === strings["add"]) {
                currSymbol = "";
            }
            else if (id === "mult" || id === "divi" || id === "subt" || id === "add") {
                currSymbol = "";
            }
            
            currSymbol += strings[id];
            if (currSymbol.length > 7) {
                currSymbol = "ERROR";
            }
            showSymbol(currSymbol);
        }
    });
});