$(document).ready(function () {
    var strings = {
        divi: "&div;",
        mult: "&times;",
        subt: "&minus;",
        add: "&plus;",
        point: ".",
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
        divi: function (a, b) {
            return a / b;
        },
        mult: function (a, b) {
            return a * b;
        },
        add: function (a, b) {
            return a + b;
        },
        subt: function (a, b) {
            return a - b;
        }
    };
    var opStrings = ["&div;", "&times;", "&plus;", "&minus;"]

    function showSymbol(symbol) {
        $(".symbol p").html(symbol);
    }

    function showExpression(expression, current) {
        if (Array.isArray(expression)) {
            var exp = expression.map(function (item) {
                    if (operations.hasOwnProperty(item)) {
                        return strings[item];
                    }
                    return item;
                })
                .join("");
        } else {
            exp = expression.join("");
        }
        $(".expression p").html(exp + current);
        return exp + current;
    }

    function calculate(expression) {
        var operands = expression.filter(function (item) {
                return !operations.hasOwnProperty(item);
            })
            .map(function (item) {
                return parseFloat(item);
            });
        var ops = expression.filter(function (item) {
            return operations.hasOwnProperty(item);
        });
        var initial = operands.shift();
        var res = operands.reduce(function (init, op) {
            var result = operations[ops[0]](init, op);
            ops.shift();
            return result;
        }, initial)
        if (res % 1 != 0) {
            return res.toFixed(2);
        }
        return res;

    }
    var result;
    $(".btn").click(function (event) {
        var id = event.currentTarget.id;
        if (id === "ac" || id === "ce") {
            if (!currSymbol && !result == null) {
                return;
            }
            if (opStrings.indexOf(currSymbol) !== -1) {
                expression.pop();
                showExpression(expression, "");
                currSymbol = expression.pop();
                return;
            }
            else {
                currSymbol = "";
            }
            result = null;
            showExpression(expression, "");
            if (id === "ac") {
                expression = [];
                showExpression(expression, "0");
            }
            showSymbol("0");
        } else if (id === "equals") {
            if (opStrings.indexOf(currSymbol) !== -1 || !currSymbol) {
                return;
            }
            if (currSymbol) {
                expression.push(currSymbol);
            } else {
                expression.push(result);
            }
            if (!operations.hasOwnProperty(expression[expression.length - 1])) {
                currSymbol = calculate(expression);
                showExpression(expression, "=" + currSymbol);
                expression = [];
                showSymbol(currSymbol);
                result = currSymbol;
                currSymbol = "";
            }
        } else {
            if (opStrings.indexOf(currSymbol) !== -1) {
                if (operations.hasOwnProperty(id)) {
                    return;
                }
                currSymbol = "";
            } else if (operations.hasOwnProperty(id)) {
                if (result) {
                    currSymbol = result;
                    result = null;
                }
                if (currSymbol === "") {
                    return;
                }
                expression.push(currSymbol);
                currSymbol = "";
                expression.push(id);

            }
            result = null;
            currSymbol += strings[id]
            if (currSymbol.length > 7) {
                expression = ["DIGIT LIMIT MET"];
                currSymbol = "  ERROR";
            }
            if (opStrings.indexOf(currSymbol) !== -1) {
                showExpression(expression, "");
            } else {
                showExpression(expression, currSymbol);
            }
            showSymbol(currSymbol);
        }
    });
});