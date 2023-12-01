document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = generateFood();

    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Draw the snake
        ctx.fillStyle = '#2ecc71';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    
        // Draw the food
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    
        // Move the snake
        moveSnake();
    
        // Check for collisions
        checkCollisions();
    
        // Check for food consumption
        checkFood();
    
        // Request the next animation frame with a delay
        setTimeout(function () {
            requestAnimationFrame(draw);
        }, 100); // Adjust the delay (in milliseconds) to control the speed
    }
    

    function moveSnake() {
        let newHead = { ...snake[0] };

        switch (direction) {
            case 'up':
                newHead.y -= 1;
                break;
            case 'down':
                newHead.y += 1;
                break;
            case 'left':
                newHead.x -= 1;
                break;
            case 'right':
                newHead.x += 1;
                break;
        }

        // Add the new head to the front of the snake
        snake.unshift(newHead);

        // Remove the tail if the snake didn't eat food
        if (!ateFood()) {
            snake.pop();
        }
    }

    function checkCollisions() {
        // Check for collisions with walls
        const head = snake[0];
        if (
            head.x < 0 ||
            head.x >= canvas.width / gridSize ||
            head.y < 0 ||
            head.y >= canvas.height / gridSize
        ) {
            resetGame();
        }

        // Check for collisions with the snake's own body
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
            }
        }
    }

    function checkFood() {
        const head = snake[0];

        // Check if the snake ate the food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food
            food = generateFood();
        }
    }

    function ateFood() {
        const head = snake[0];
        return head.x === food.x && head.y === food.y;
    }

    function generateFood() {
        const x = Math.floor(Math.random() * (canvas.width / gridSize));
        const y = Math.floor(Math.random() * (canvas.height / gridSize));

        // Make sure the food doesn't spawn on the snake
        for (let i = 0; i < snake.length; i++) {
            if (x === snake[i].x && y === snake[i].y) {
                return generateFood();
            }
        }

        return { x, y };
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        food = generateFood();
    }

    // Handle keyboard input
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    // Start the game loop
    draw();
});
