// Oyun tahtasını temsil eden bir matris
var board;

// Oyuncu puanı
var score = 0;

// Oyun tahtasının satır ve sütun sayıları
var rows = 4;
var columns = 4;

// Sayfa yüklendiğinde oyunu başlatan fonksiyon
window.onload = function() {
    setGame();
}

// Oyunu başlatan fonksiyon
function setGame() {
    // Oyun tahtası başlangıçta boş bir matris olarak oluşturulur
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // Oyun tahtasını HTML'de oluştur
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    // Oyun başlangıcında 2 rastgele kareye 2 değeri atanır
    setTwo();
    setTwo();
}

// Karedeki değeri güncelleyen fonksiyon
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // classList temizlenir
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

// Klavye olaylarını dinleyen fonksiyon
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    // Oyuncu puanını güncelle
    document.getElementById("score").innerText = score;
})

// Satırdaki sıfır olmayan elemanları filtreleyen fonksiyon
function filterZero(row){
    return row.filter(num => num != 0); // sıfır olmayan elemanlar için yeni bir dizi oluşturur
}

// Satırı kaydıran fonksiyon
function slide(row) {
    row = filterZero(row); // sıfır olmayan elemanları filtrele
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) { // yan yana aynı sayılar varsa
            row[i] *= 2; // birleştir
            row[i+1] = 0; // diğerini sıfırla
            score += row[i]; // puanı güncelle
        }
    }
    row = filterZero(row); // sıfır olmayan elemanları filtrele
    // sıfırlar ekle
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

// Sol yönde kaydıran fonksiyon
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Sağ yönde kaydıran fonksiyon
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Yukarı yönde kaydıran fonksiyon
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Aşağı yönde kaydıran fonksiyon
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Rastgele bir kareye 2 ekleyen fonksiyon
function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        // rastgele bir satır ve sütun seç
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

// Boş bir kare var mı kontrol eden fonksiyon
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true; // en az bir sıfır varsa true döner
            }
        }
    }
    return false; // hiç sıfır yoksa false döner
}
