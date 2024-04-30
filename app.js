table = document.getElementById("table")
can_put_letter = true
restarted = false

function putLetter(r,c,letter) {
    if (letter == "O") {
        table.rows[r].cells[c].innerHTML = letter
        table.rows[r].cells[c].classList.remove("clickable")
        table.rows[r].cells[c].classList.remove("waiting")
        return true
    }
    else if (table.rows[r].cells[c].classList.contains("clickable") && can_put_letter) {
        table.rows[r].cells[c].innerHTML = letter
        table.rows[r].cells[c].classList.remove("clickable")
        can_put_letter = false
        changeClassTags("clickable","waiting")
        return true
    }
    else {
        return false
    }
}

function changeClassTags(old_name,new_name) {
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            if (table.rows[r].cells[c].classList.contains(old_name)) {
                table.rows[r].cells[c].classList.add(new_name)
                table.rows[r].cells[c].classList.remove(old_name)
            }
        }
    }
}

function getEmptyCells() {
    empty_cells = []
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            if (table.rows[r].cells[c].innerHTML === " ") {
                empty_cells.push([r,c])
            }
        }
    }
    return empty_cells
}

function selectRandomCell(empty_cells) {
    index = Math.floor(Math.random()*empty_cells.length)
    return empty_cells[index]
}

function gameTurn(r,c) {
    if (putLetter(r,c,"X")) {
        winner = whoIsWinner()
        if (winner !== " ") {
            finish(winner)
            return
        }
        empty_cells = getEmptyCells()
        if (empty_cells.length === 0) {
            finish(" ")
            return
        }
        setTimeout(() => {
            if (!restarted) {
                cell = selectRandomCell(empty_cells)
                row = cell[0]
                column = cell[1]
                putLetter(row,column,"O")
                can_put_letter = true
                changeClassTags("waiting","clickable")
                winner = whoIsWinner()
                if (winner !== " ") finish(winner)
            }
        },1000)
    }
}

function whoIsWinner() {
    rows = [[" "," "," "],[" "," "," "],[" "," "," "]]
    columns = [[" "," "," "],[" "," "," "],[" "," "," "]]
    diagonals = [[" "," "," "],[" "," "," "]]
    for (r=0;r<3;r++) {
        for (c=0;c<3;c++) {
            letter = table.rows[r].cells[c].innerHTML
            rows[r][c] = letter
            columns[c][r] = letter
        }
    }
    for (i=0;i<3;i++) {
        diagonals[0][i] = rows[i][i]
        diagonals[1][i] = rows[2-i][i]
    }
    all = rows.concat(columns).concat(diagonals)
    for (i=0;i<all.length;i++) {
        console.log(rows[i])
    }
    for (i=0;i<all.length;i++) {
        finished = false
        if (all[i][0] === all[i][1] & all[i][1] === all[i][2] & all[i][0] !== " ") {
            return all[i][0]
        }
    }
    return " "
}

function finish(winner) {
    if (winner === " ") document.getElementById("result-label").innerHTML = "There is no winner"
    else document.getElementById("result-label").innerHTML = "The winner is "+winner
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            table.rows[r].cells[c].classList.remove("clickable")
            table.rows[r].cells[c].classList.remove("waiting")
        }
    }
}

function restart() {
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            table.rows[r].cells[c].innerHTML = " "
            table.rows[r].cells[c].classList.remove("waiting")
            table.rows[r].cells[c].classList.add("clickable")
            can_put_letter = true
        }
    }
    document.getElementById("result-label").innerHTML = ""
    restarted = true
    setTimeout(() => {
        restarted = false 
    }, 1000);
}

function main() {
    document.getElementById("restart-label").addEventListener("click",restart)
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            table.rows[r].cells[c].addEventListener("click",() => gameTurn(r,c))
        }
    }
}

main()