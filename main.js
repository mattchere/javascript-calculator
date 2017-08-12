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
    var currSymbol = "";
    var expression = [];
    var operations = {
        divi: function(a, b) {return a/b;},
        mult: function(a, b) {return a*b;},
        add: function(a, b) {return a+b;},
        subt: function (a, b) {return a-b;}
    };

    function showSymbol(symbol) {
        $(".symbol p").html(symbol);
    }

    function calculate(expression) {
        var operands = expression.filter(function(item) {
            return !operations.hasOwnProperty(item);
        })
            .map(function(item) {
                return parseInt(item);
            });
        var ops = expression.filter(function(item) {
            return operations.hasOwnProperty(item);
        });
        var initial = operands.shift();
        return operands.reduce(function(init, op) {
            var result = operations[ops[0]](init, op);
            ops.shift();
            return result;
        }, initial);
    }

    $(".btn").click(function(event) {
        var id = event.currentTarget.id;
        if (id === "ac" || id === "ce") {
            currSymbol = "";
            if (id === "ac") {
                expression = [];
            }
            showSymbol("0");
        }
        else if (id === "equals") {
            expression.push(currSymbol);
            currSymbol = calculate(expression);
            expression = [];
            showSymbol(currSymbol);
        }
        else {
            if (currSymbol === strings["mult"] || currSymbol === strings["divi"] || currSymbol === strings["subt"] || currSymbol === strings["add"]) {
                currSymbol = "";
            }
            else if (operations.hasOwnProperty(id)) {
                expression.push(currSymbol);
                currSymbol = "";
                expression.push(id);
            }
            currSymbol += strings[id];
            if (currSymbol.length > 7) {
                alert(currSymbol);
                expression = ["DIGIT LIMIT MET"];
                currSymbol = "  ERROR";
            }
            showSymbol(currSymbol);
        }
    });
});