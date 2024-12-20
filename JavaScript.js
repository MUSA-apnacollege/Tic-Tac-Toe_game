document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#Reset-btn");
    let turnO = true;
    let gameActive = true;

    // Winning patterns
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Handle box click
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerHTML === "" && gameActive) {
                box.innerHTML = turnO ? "O" : "X";
                box.style.pointerEvents = "none"; // Disable further clicks on this box
                checkWinner();
                turnO = !turnO;
            }
        });
    });

    // Check for a winner
    const checkWinner = () => {
        let winner = null;

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;

            if (
                boxes[a].innerHTML &&
                boxes[a].innerHTML === boxes[b].innerHTML &&
                boxes[a].innerHTML === boxes[c].innerHTML
            ) {
                winner = boxes[a].innerHTML;
                break;
            }
        }

        if (winner) {
            console.log(`Player ${winner} wins!`);
            gameActive = false; // End the game
            boxes.forEach((box) => (box.style.pointerEvents = "none")); // Disable all boxes
            alert(`Player ${winner} wins!`);
        } else if (Array.from(boxes).every((box) => box.innerHTML !== "")) {
            console.log("It's a draw!");
            alert("It's a draw!");
        }
    };

    // Reset game
    resetBtn.addEventListener("click", () => {
        boxes.forEach((box) => {
            box.innerHTML = "";
            box.style.pointerEvents = "auto"; // Enable clicks again
        });
        turnO = true;
        gameActive = true;
        console.clear();
    });
});
