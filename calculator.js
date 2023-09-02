var nums = []
let ops = []
var buf = "0"

function calculate() {
    var result = parseFloat(nums[0])
    for (var i = 0; i < ops.length - 1; i++) {
        switch (ops[i]) {
            case '+':
                result += parseFloat(nums[i + 1])
                break;
            case '-':
                result -= parseFloat(nums[i + 1])
                break;
            case '×':
                result *= parseFloat(nums[i + 1])
                break;
            case '÷':
                result /= parseFloat(nums[i + 1])
            default:
                break;
        }
    }
    result = String(result)
    if (ops[ops.length - 1] === "=") {
        nums = []
        ops = []
        buf = result
        return result
    }
    return result;
}

function display() {
    var d = "Error";
    if (buf == "") {
        d = calculate()
    } else {
        d = buf
    }
    document.getElementById("current-num").innerHTML = d
}

function sopHandler(sop) {
    switch (sop) {
        case "C":
            nums = []
            ops = []
            buf = "0"
            break;
        case "±":
            if (buf == "") {
                buf = "-0"
            } else {
                buf = String(-parseFloat(buf))
            }
            break;
        case "%":
            if (buf == "") {
                buf = "0"
            } else if (parseFloat(buf) == 0) {
                buf = "0"
            } else {
                buf = String(parseFloat(buf) / 100)
            }
            break;
        default:
            buf = "Error"
            nums = []
            ops = []
            break;
    }
}

function appendTobuf(num) {
    if (buf === "0") {
        buf = num
    } else if (buf === "-0") {
        buf = "-" + num
    } else if (buf === "Error") {
        buf = num
    } else if (buf.includes(".") && num === ".") {
        return
    } else {
        buf += num
    }
}

function buttonClick(elem) {
    // get the class of elem
    if (elem.classList.contains("number")) {
        if (buf.length > 10) {
            return
        }
        appendTobuf(elem.innerHTML)
    } else if (elem.classList.contains("operator")) {
        if (buf == "") {
            if (ops.length == 0) {
                ops.push(elem.innerHTML)
            } else {
                ops[ops.length - 1] = elem.innerHTML
            }
            return
        }
        nums.push(buf)
        ops.push(elem.innerHTML)
        buf = ""
    } else if (elem.classList.contains("sop")) {
        sopHandler(elem.innerHTML)
    }
    display()
}