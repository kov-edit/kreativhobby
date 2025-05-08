<template>
    <div class="landing-page">
        <header class="header">
            <h1>Welcome to Kreativ Hobby</h1>
            <p>Unleash your creativity with our amazing products!</p>
            <button @click="exploreProducts">Explore Products</button>
        </header>

        <section class="features">
            <h2>Why Choose Us?</h2>

        </section>

        <footer class="footer">
            <p>&copy; 2023 Kreativ Hobby. All rights reserved.</p>
        </footer>
    </div>
</template>

<script setup>

</script>

<style scoped>
.landing-page {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
}

.header {
    background-color: #f8f9fa;
    padding: 50px 20px;
}

.header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.header p {
    font-size: 1.2rem;
    margin-bottom: 20px;
}

.header button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.header button:hover {
    background-color: #0056b3;
}

.features {
    margin: 40px 0;
}

.features h2 {
    font-size: 2rem;
    margin-bottom: 20px;
}

.feature {
    margin-bottom: 20px;
}

.feature h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.footer {
    background-color: #343a40;
    color: white;
    padding: 20px 0;
    margin-top: 40px;
}
</style>