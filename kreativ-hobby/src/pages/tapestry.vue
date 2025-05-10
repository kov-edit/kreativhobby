<template>
  <div class="container">
    <h1 id="title">Tapestry crochet pattern generator</h1>

    <div class="about">
      
      <div class="text boxes">
        <div style="
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 0 10px;
          color: #e3747e;
          font-size: 18px;
        ">✧⧉✧⧉✧</div>
        
        <h3 style="color: #99642b; margin-top: 5px; text-align: center;">What is this craf about?</h3>
        
        
        <p class="textp">
          Tapestry crochet is a distinctive crochet technique that transforms simple stitches into vibrant, patterned fabric by skillfully working with multiple yarn colors. The term "tapestry" refers to the traditional art of creating pictorial designs in woven textiles, and this crochet method beautifully replicates that effect with yarn and hook. Unlike standard colorwork techniques where yarns are changed at row ends, tapestry crochet allows for intricate color patterns to emerge within each row, making it perfect for creating detailed motifs, geometric patterns, and even pictorial scenes.
        </p>
        
        
        <div style="font-size: 12px; color: #99642b; text-align: center;">━━━━━━◆━━━━━━</div>
      </div>
      
      <div class="videos boxes">
        <div style="
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 0 10px;
          color: #e3747e;
          font-size: 18px;
        ">✧⧉✧⧉✧</div>
        
        <h3 style="color: #99642b; margin-top: 5px;">Help for your first tapestry project</h3>
        
        <div style="
          background: #f5e9d9;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          font-size: 14px;
        ">
          <p><a href="https://www.youtube.com/watch?v=qV2HD1Hzz8c" target="_blank">How to start</a></p>
          <p><a href="https://www.youtube.com/watch?v=Xwx_wB4QA1U" target="_blank">Tips and tricks for tapestry crochet</a></p>
        </div>
        
        <div style="text-align: left; font-size: 14px;">
          <p><strong>🧶 Pro Tips:</strong></p>
          <ul style="padding-left: 20px; margin-top: 5px;">
            <li>Use <strong>bobby pins</strong> as stitch markers</li>
            <li>Carry yarn <strong>loosely</strong></li>
            <li>Try <strong>variegated yarn</strong></li>
          </ul>
        </div>
        
        <p style="margin-bottom: 0;">Happy crocheting 😊</p>
        <div style="font-size: 12px; color: #99642b;">━━━━━━◆━━━━━━</div>
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
          <input type="range" min="5" max="40" v-model="pixelSize" @input="updatePixelation" id="pixel"/>
          <span>{{ pixelSize }}</span>
        </div>

        <div class="slider-group">
          <label>Grid Opacity:</label>
          <input type="range" min="0" max="60" v-model="gridOpacity" @input="updatePixelation" id="grid"/>
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

  <div class="rating-container">
    <p>How do you like the pattern?</p>
    <div class="popupContent"></div>
    <div class="rating">
    <input type="radio" id="star-5" name="star-radio" value="star-1" @click="rate">
    <label for="star-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
    </label>
    <input type="radio" id="star-4" name="star-radio" value="star-1" @click="rate">
    <label for="star-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
    </label>
    <input type="radio" id="star-3" name="star-radio" value="star-1" @click="rate">
    <label for="star-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
    </label>
    <input type="radio" id="star-2" name="star-radio" value="star-1" @click="rate">
    <label for="star-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
    </label>
    <input type="radio" id="star-1" name="star-radio" value="star-1" @click="rate">
    <label for="star-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
    </label>
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

function rate() {
  const popup = document.createElement("p");
    popup.innerHTML = ('Thank you for your feedback!');
    popup.style.cssText = "  padding: 20px; background-color: #f24b91;color: white;opacity: 1; transition: opacity 0.6s;margin-bottom: 15px;"
    document.querySelector(".popupContent").appendChild(popup);
}

</script>

<style scoped>
#title {
  text-shadow: #e8cfa6 5px 3px 1px;
  font-family: 'Courier New', monospace;
}

.text {
  background-color: #efcbb4;
  text-align: justify;
  border: 0px solid #f1b288;
  border-radius: 10px;
  padding: 10px 25px;
  box-shadow: 10px 10px 5px rgb(247, 185, 159);
}

.videos {
  background-color: #efcbb4;
  text-align: center;
  border: 0px solid #f1b288;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 10px 10px 5px rgb(247, 185, 159);
}

.videos a {
  text-decoration: none;
  color: #160798;
}

.boxes {
  background: #fff9f0;
        padding: 20px;
        border-radius: 10px;
        border: 4px dashed #f0b8b8;
        position: relative;
        margin: 0 auto;
        font-family: 'Courier New', monospace;
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
  background-color: #b33626;
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
  background: linear-gradient(135deg, #fabbbb, #824242);
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


.rating-container {
  text-align: center;
}

.rating {
  /*display: flex;
  flex-direction: row-reverse;*/
  text-align: center;
  gap: 0.3rem;
  --stroke: #666;
  --fill: #ffc73a;
}

.rating input {
  appearance: unset;
}

.rating label {
  cursor: pointer;
}

.rating svg {
  width: 2rem;
  height: 2rem;
  overflow: visible;
  fill: transparent;
  stroke: var(--stroke);
  stroke-linejoin: bevel;
  stroke-dasharray: 12;
  animation: idle 4s linear infinite;
  transition: stroke 0.2s, fill 0.5s;
}

@keyframes idle {
  from {
    stroke-dashoffset: 24;
  }
}

.rating label:hover svg {
  stroke: var(--fill);
}

.rating input:checked ~ label svg {
  transition: 0s;
  animation: idle 4s linear infinite, yippee 0.75s backwards;
  fill: var(--fill);
  stroke: var(--fill);
  stroke-opacity: 0;
  stroke-dasharray: 0;
  stroke-linejoin: miter;
  stroke-width: 8px;
}

@keyframes yippee {
  0% {
    transform: scale(1);
    fill: var(--fill);
    fill-opacity: 0;
    stroke-opacity: 1;
    stroke: var(--stroke);
    stroke-dasharray: 10;
    stroke-width: 1px;
    stroke-linejoin: bevel;
  }

  30% {
    transform: scale(0);
    fill: var(--fill);
    fill-opacity: 0;
    stroke-opacity: 1;
    stroke: var(--stroke);
    stroke-dasharray: 10;
    stroke-width: 1px;
    stroke-linejoin: bevel;
  }

  30.1% {
    stroke: var(--fill);
    stroke-dasharray: 0;
    stroke-linejoin: miter;
    stroke-width: 8px;
  }

  60% {
    transform: scale(1.2);
    fill: var(--fill);
  }
}

#pixel {
  accent-color: #ea4124;
}

#grid {
  accent-color: #ea4124;
}

</style>