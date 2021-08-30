function eval() {
    // Do not use eval!!!
    return;
}

function devision(expr, char) {
    if (+expr.slice(char + 1) == 0) throw 'Division by zero.';
    return +expr.slice(0, char) / (+expr.slice(char + 1));
}

function multiply(expr, char) {
    return +expr.slice(0, char) * (+expr.slice(char + 1));
}

function sum(expr, char) {
    return +expr.slice(0, char) + (+expr.slice(char + 1));
}

function sub(expr, char) {
    return +expr.slice(0, char) - (+expr.slice(char + 1));
}

function getRange(expr, char) {
    let curChar = expr.indexOf(char, 1);
    let prevChar = expr.slice(0, curChar).lastIndexOf('/');
    // if (expr.slice(0, curChar).lastIndexOf('*') > prevChar) {
    //     prevChar = expr.slice(0, curChar).lastIndexOf('*');
    // } else if (expr.slice(1, curChar).lastIndexOf('-') > prevChar) {
    //     prevChar = expr.slice(0, curChar).lastIndexOf('-');
    // } else if (expr.slice(0, curChar).lastIndexOf('+') > prevChar) {
    //     prevChar = expr.slice(0, curChar).lastIndexOf('+');
    // }
    if (expr.slice(0, curChar).lastIndexOf('*') > prevChar) {
        prevChar = expr.slice(0, curChar).lastIndexOf('*');
    }
    if (expr.slice(1, curChar).lastIndexOf('-') > prevChar) {
        prevChar = expr.slice(0, curChar).lastIndexOf('-');
    }
    if (expr.slice(0, curChar).lastIndexOf('+') > prevChar) {
        prevChar = expr.slice(0, curChar).lastIndexOf('+');
    }
    let nextChar = expr.length;
    // if (expr.slice(curChar + 1).indexOf('/') != -1 && expr.slice(curChar + 1).indexOf('/') < nextChar) {
    //     nextChar = expr.slice(curChar + 1).indexOf('/');
    // } else if (expr.slice(curChar + 1).indexOf('*') != -1 && expr.slice(curChar + 1).indexOf('*') < nextChar) {
    //     nextChar = expr.slice(curChar + 1).indexOf('*');
    // } else if (expr.slice(curChar + 1).indexOf('+') != -1 && expr.slice(curChar + 1).indexOf('+') < nextChar) {
    //     nextChar = expr.slice(curChar + 1).indexOf('+');
    // } else if (expr.slice(curChar + 1).indexOf('-') != -1 && expr.slice(curChar + 1).indexOf('-') < nextChar) {
    //     nextChar = expr.slice(curChar + 1).indexOf('-');
    // }
    if (expr.slice(curChar + 1).indexOf('/') != -1 && expr.slice(curChar + 1).indexOf('/') < nextChar) {
        nextChar = expr.slice(curChar + 1).indexOf('/');
    }
    if (expr.slice(curChar + 1).indexOf('*') != -1 && expr.slice(curChar + 1).indexOf('*') < nextChar) {
        nextChar = expr.slice(curChar + 1).indexOf('*');
    }
    if (expr.slice(curChar + 1).indexOf('+') != -1 && expr.slice(curChar + 1).indexOf('+') < nextChar) {
        nextChar = expr.slice(curChar + 1).indexOf('+');
    }
    if (expr.slice(curChar + 2).indexOf('-') != -1 && expr.slice(curChar + 2).indexOf('-') < nextChar) {
        nextChar = expr.slice(curChar + 1).indexOf('-');
    }

    // if (expr.slice(curChar + 1).indexOf('-') != -1) {
    //     let fromChar = curChar + 1;
    //     while(expr.slice(fromChar).include)
    //     if (expr.slice(curChar + 1).indexOf('-') < nextChar) {
    //         nextChar = expr.slice(curChar + 1).indexOf('-');
    //     }
    // }

    if (nextChar == expr.length) {
        return [prevChar + 1, curChar, nextChar - 1]
    }
    return [prevChar + 1, curChar, nextChar + curChar];
}

function parseFromBrackets(expr) {
    // expr = expr.slice(1, -2);
    while (expr.includes('/')) {
        let range = getRange(expr, '/');
        if (expr[range[0] - 1] == '-') {
            range[0]--;
            if (range[0] != 0) {
                expr = expr.slice(0, range[0]) + '+' + expr.slice(range[0]);
                range[0]++;
                range[1]++;
                range[2]++;
            }
        }
        expr = expr.slice(0, range[0]) + devision(expr.slice(range[0], range[2] + 1), range[1] - range[0]) + expr.slice(range[2] + 1);
        if (expr[range[0]] == '-' && expr[range[0] - 1] == '+') {
            expr = expr.slice(0, range[0] - 1) + expr.slice(range[0]);
        }
    }
    while (expr.includes('*')) {
        let range = getRange(expr, '*');
        if (expr[range[0] - 1] == '-') {
            range[0]--;
            if (range[0] != 0) {
                expr = expr.slice(0, range[0]) + '+' + expr.slice(range[0]);
                range[0]++;
                range[1]++;
                range[2]++;
            }
        }
        expr = expr.slice(0, range[0]) + multiply(expr.slice(range[0], range[2] + 1), range[1] - range[0]) + expr.slice(range[2] + 1);
        if (expr[range[0]] == '-' && expr[range[0] - 1] == '+') {
            expr = expr.slice(0, range[0] - 1) + expr.slice(range[0]);
        }
    }
    while (expr.includes('+')) {
        let range = getRange(expr, '+');
        if (expr[range[0] - 1] == '-') {
            range[0]--;
            if (range[0] != 0) {
                expr = expr.slice(0, range[0]) + '+' + expr.slice(range[0]);
                range[0]++;
                range[1]++;
                range[2]++;
            }
        }
        expr = expr.slice(0, range[0]) + sum(expr.slice(range[0], range[2] + 1), range[1] - range[0]) + expr.slice(range[2] + 1);
        if (expr[range[0]] == '-' && expr[range[0] - 1] == '+') {
            expr = expr.slice(0, range[0] - 1) + expr.slice(range[0]);
        }
    }
    while (expr.includes('-') && expr.lastIndexOf('-') != 0) {
        let range = getRange(expr, '-');
        if (expr[range[0] - 1] == '-') {
            range[0]--;
            if (range[0] != 0) {
                expr = expr.slice(0, range[0]) + '+' + expr.slice(range[0]);
                range[0]++;
                range[1]++;
                range[2]++;
            }
        }
        expr = expr.slice(0, range[0]) + sub(expr.slice(range[0], range[2] + 1), range[1] - range[0]) + expr.slice(range[2] + 1);
        if (expr[range[0]] == '-' && expr[range[0] - 1] == '+') {
            expr = expr.slice(0, range[0] - 1) + expr.slice(range[0]);
        }
    }
    return expr;
}

function expressionCalculator(expr) {
    let bracketsPairs = [0, 0];
    let bracketsStartPos = expr.indexOf('(');
    while(bracketsStartPos != -1) {
        bracketsPairs[0]++;
        bracketsStartPos = expr.indexOf('(', bracketsStartPos + 1);
    }
    bracketsStartPos = expr.indexOf(')');
    while(bracketsStartPos != -1) {
        bracketsPairs[1]++;
        bracketsStartPos = expr.indexOf(')', bracketsStartPos + 1);
    }
    if (bracketsPairs[0] != bracketsPairs[1]) {
        return 'ExpressionError: Brackets must be paired';
    }


    while (expr.includes(' ')) {
        let spacePos = expr.indexOf(' ');
        expr = expr.slice(0, spacePos) + expr.slice(spacePos + 1);
    }


    while (expr.includes('(')) {
        let openBracket = expr.lastIndexOf('(');
        let closeBracket = expr.indexOf(')', openBracket);
        expr = expr.slice(0, openBracket) + parseFromBrackets(expr.slice(openBracket + 1, closeBracket)) + expr.slice(closeBracket + 1);
    }

    expr = parseFromBrackets(expr);
    return +expr;
}

console.log(expressionCalculator('2/0'));

module.exports = {
    expressionCalculator
}