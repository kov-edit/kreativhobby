<template>
  <div class="container">
    <h1>Tapestry crochet pattern generator</h1>

    <div class="about">
      <div class="text">
        <p class="textp">
          <b>What this craft is about?</b><br>
          Tapestry crochet is a distinctive crochet technique that transforms simple stitches into vibrant, patterned fabric by skillfully working with multiple yarn colors. The term "tapestry" refers to the traditional art of creating pictorial designs in woven textiles, and this crochet method beautifully replicates that effect with yarn and hook. Unlike standard colorwork techniques where yarns are changed at row ends, tapestry crochet allows for intricate color patterns to emerge within each row, making it perfect for creating detailed motifs, geometric patterns, and even pictorial scenes.
        </p>
      </div>
      <div class="videos">
        <p><a href="https://www.youtube.com/watch?v=qV2HD1Hzz8c" target="_blank">Help for your first tapestry project</a></p>
        <p><a href="https://www.youtube.com/watch?v=Xwx_wB4QA1U" target="_blank">Tips and tricks for tapestry crochet</a></p>
        <p>Happy crocheting😊</p>
      </div>
    </div>

    <div class="controls">
      <div class="file-upload-container">
        <div class="konténer">
          <div class="folder">
            <div class="front-side">
              <div class="tip"></div>
              <div class="cover"></div>
            </div>
            <div class="back-side cover"></div>
          </div>

          <label class="custom-file-upload">
            <input type="file" ref="imageInput" @change="handleFile" accept="image/*" />
            Choose a file
          </label>
        </div>
      </div>

      <div class="sliders">
        <div class="slider-group">
          <label>Pixel Size:</label>
          <input type="range" min="5" max="40" v-model="pixelSize" @input="updatePixelation" />
          <span>{{ pixelSize }}</span>
        </div>

        <div class="slider-group">
          <label>Grid Opacity:</label>
          <input type="range" min="0" max="60" v-model="gridOpacity" @input="updatePixelation" />
          <span>{{ gridOpacity }}%</span>
        </div>
      </div>

      <div class="buttons">
        <!--<button @click="processImage">Process Image</button>-->
        <button @click="clearSaved">Clear Image</button>
      </div>
    </div>

    <canvas ref="canvas" style="display: none;"></canvas>

    <div class="pixel-grid-container">
      <div class="pixel-container">
          <div
    v-for="(row, rowIndex) in pixelRows"
    :key="rowIndex"
    class="pixel-row"
    :style="{ opacity: row.rowOpacity }"
  >
    <div
      v-for="(pixel, pixelIndex) in row.pixels"
      :key="pixelIndex"
      class="pixel"
      :style="{
        width: pixelSize + 'px',
        height: pixelSize + 'px',
        backgroundColor: pixel.color,
        borderColor: `rgba(0, 0, 0, ${gridOpacity / 100})`,
      }"
    ></div>

          <div class="checkbox-container">
      <input
        type="checkbox"
        :id="`row-${rowIndex}`"
        v-model="checkedRows[rowIndex]"
        @change="toggleRowOpacity(rowIndex)"
      />
      <label :for="`row-${rowIndex}`">{{ rowIndex + 1 }}</label>
    </div>
  </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const pixelSize = ref(15)
const gridOpacity = ref(20)
const canvas = ref(null)
const imageInput = ref(null)

const pixelRows = ref([])
const checkedRows = reactive({})
const currentImage = ref(null)

onMounted(() => {
  checkForSavedImage()
})

function handleFile() {
  const file = imageInput.value.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        currentImage.value = img
        processCanvas(img)
        saveToLocalStorage(e.target.result)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

/*function processImage() {
  if (imageInput.value.files.length === 0) {
    alert('Please select an image first')
    return
  }
  handleFile()
}*/

function updatePixelation() {
  if (currentImage.value) {
    processCanvas(currentImage.value)
    saveSettingsToLocalStorage()
  }
}

function processCanvas(img) {
  const pxSize = parseInt(pixelSize.value)
  const targetWidth = img.width * 2
  const targetHeight = img.height
  
  canvas.value.width = targetWidth
  canvas.value.height = targetHeight

  const ctx = canvas.value.getContext('2d')
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

  const data = ctx.getImageData(0, 0, targetWidth, targetHeight).data

  const cols = Math.ceil(targetWidth / pxSize)
  const rows = Math.ceil(targetHeight / pxSize)
  pixelRows.value = []

  for (let i = 0; i < rows; i++) {
    checkedRows[i] = false
  }

  for (let y = 0; y < rows; y++) {
    const pixels = []
    for (let x = 0; x < cols; x++) {
      const avg = getAverageColor(data, targetWidth, x * pxSize, y * pxSize, pxSize)
      pixels.push({
        color: `rgba(${avg.r}, ${avg.g}, ${avg.b}, ${avg.a})`
      })
    }
    pixelRows.value.push({
      pixels,
      rowOpacity: 1 // Default full opacity
    })
  }
}

function toggleRowOpacity(rowIndex) {
  // Toggle between full opacity (1) and lowered opacity (0.5)
  pixelRows.value[rowIndex].rowOpacity = checkedRows[rowIndex] ? 0.5 : 1
}

function getAverageColor(data, width, startX, startY, blockSize) {
  let r = 0, g = 0, b = 0, a = 0, count = 0

  for (let y = startY; y < startY + blockSize; y++) {
    for (let x = startX; x < startX + blockSize; x++) {
      const i = (y * width + x) * 4
      if (i >= data.length - 3) continue

      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      a += data[i + 3]
      count++
    }
  }

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
    a: a / count / 255
  }
}

function saveToLocalStorage(imageData) {
  localStorage.setItem('pixelatedImage', imageData)
  saveSettingsToLocalStorage()
}

function saveSettingsToLocalStorage() {
  localStorage.setItem('pixelatorSettings', JSON.stringify({
    pixelSize: pixelSize.value,
    gridOpacity: gridOpacity.value
  }))
}

function checkForSavedImage() {
  const saved = localStorage.getItem('pixelatedImage')
  if (!saved) return

  const img = new Image()
  img.onload = () => {
    currentImage.value = img
    processCanvas(img)
  }
  img.src = saved

  const settings = localStorage.getItem('pixelatorSettings')
  if (settings) {
    const parsed = JSON.parse(settings)
    pixelSize.value = parseInt(parsed.pixelSize)
    gridOpacity.value = parseInt(parsed.gridOpacity)
  }
}

function clearSaved() {
  pixelRows.value = []
  imageInput.value.value = ''
  currentImage.value = null
  localStorage.removeItem('pixelatedImage')
  localStorage.removeItem('pixelatorSettings')
}
</script>

<style scoped>
.text {
  background-color: #efcbb4;
  text-align: justify;
  border: 0px solid #f1b288;
  border-radius: 10px;
  padding: 10px 15px;
}

.videos {
  background-color: #efcbb4;
  text-align: center;
  border: 0px solid #f1b288;
  border-radius: 10px;
  padding: 10px;
}

.videos a {
  text-decoration: none;
  color: #160798;
}

.about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    padding-bottom: 15px;
    margin-bottom: 20px;
}

.container {
  font-family: Arial, sans-serif;
  width: 90%;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
}

.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sliders {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 250px;
}

.slider-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-group label {
  min-width: 80px;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.pixel-grid-container {
  margin-top: 20px;
  overflow: auto;
  max-height: 70vh;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
}

.pixel-container {
  display: flex;
  flex-direction: column;
  width: fit-content;
}

.pixel-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.pixel {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
  min-width: 60px;
}

.checkbox-container label {
  margin-left: 5px;
  font-size: 0.9em;
}

/* Folder styling */
.konténer {
  --transition: 350ms;
  --folder-W: 120px;
  --folder-H: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  height: calc(var(--folder-H) * 1.7);
  position: relative;
  width: 200px;
  margin-bottom: 20px;
}

.folder {
  position: absolute;
  top: 20px;
  left: calc(50% - 60px);
  animation: float 2.5s infinite ease-in-out;
  transition: transform var(--transition) ease;
}

.folder:hover {
  transform: scale(1.05);
}

.folder .front-side,
.folder .back-side {
  position: absolute;
  transition: transform var(--transition);
  transform-origin: bottom center;
}

.folder .back-side::before,
.folder .back-side::after {
  content: "";
  display: block;
  background-color: white;
  opacity: 0.5;
  z-index: 0;
  width: var(--folder-W);
  height: var(--folder-H);
  position: absolute;
  transform-origin: bottom center;
  border-radius: 15px;
  transition: transform 350ms;
  z-index: 0;
}

.konténer:hover .back-side::before {
  transform: rotateX(-5deg) skewX(5deg);
}
.konténer:hover .back-side::after {
  transform: rotateX(-15deg) skewX(12deg);
}

.folder .front-side {
  z-index: 1;
}

.konténer:hover .front-side {
  transform: rotateX(-40deg) skewX(15deg);
}

.folder .tip {
  background: linear-gradient(135deg, #ff9a56, #ff6f56);
  width: 80px;
  height: 20px;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: -10px;
  z-index: 2;
}

.folder .cover {
  background: linear-gradient(135deg, #ffe563, #ffc663);
  width: var(--folder-W);
  height: var(--folder-H);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.custom-file-upload {
  font-size: 1.1em;
  color: #ffffff;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background var(--transition) ease;
  display: inline-block;
  width: 60%;
  padding: 10px 35px;
  position: relative;
}

.custom-file-upload:hover {
  background: rgba(255, 255, 255, 0.4);
}

.custom-file-upload input[type="file"] {
  display: none;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.pixel-row {
  transition: opacity 0.3s ease;
}
</style>