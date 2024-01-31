const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
let hue = 0
const particlesArray = []

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', function () {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})

const mouse = {
	x: undefined,
	y: undefined,
}

canvas.addEventListener('click', function (e) {
	mouse.x = e.x
	mouse.y = e.y
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle())
	}

	// drawCircle()
}) // po kliknieciu powstaje koło w danym miejscu

canvas.addEventListener('mousemove', function (e) {
	mouse.x = e.x
	mouse.y = e.y
	for (let i = 0; i < 4; i++) {
		particlesArray.push(new Particle())
	}
	// drawCircle()
}) // rysuje kola za myszka

class Particle {
	constructor() {
		this.x = mouse.x
		this.y = mouse.y
		// this.x = Math.random() * canvas.width
		// this.y = Math.random() * canvas.height
		this.size = Math.random() * 15 + 1
		this.speedX = Math.random() * 5 - 1.5 // w ktora stoen ma sie poruszac , x= 0 y =1 oznacza ze bedzie sie poruszal w prawo
		this.speedY = Math.random() * 5 - 1.5
		this.color = 'hsl(' + hue + ',100%,50%)'
	}
	update() {
		this.x += this.speedX
		this.y += this.speedY
		if (this.size > 0.2) this.size -= 0.1
	}
	draw() {
		ctx.fillStyle = this.color // zmienia kolor wnętrza koła
		// ctx.strokeStyle = 'gold' // zmienia kolor obreczy koła
		// ctx.lineWidth = 15 // grubosc obreczy kola
		ctx.beginPath() // rysowanie nowej sciezki
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2) // tworzenie kola , Math.PI *2 = 360 stopni
		// ctx.stroke() // wywołanie obreczy kola
		ctx.fill() // wywolanie koloru wnetrza kola
	}
}

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update()
		particlesArray[i].draw()
		// if (particlesArray[i].size <= 0.3) {
		// 	particlesArray.splice(i, 1)
		// 	i--
		// }
		for (let j = i; j < particlesArray.length; j++) {
			const dx = particlesArray[i].x - particlesArray[j].x
			const dy = particlesArray[i].y - particlesArray[j].y
			const distance = Math.sqrt(dx * dx + dy * dy)
			if (distance < 100) {
				ctx.beginPath()
				ctx.strokeStyle = particlesArray[i].color
				ctx.lineWidth = 0.8
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
				ctx.stroke()
			}
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height) // czysci ctx, od lewego gorengo rokgu 0,0 dod prawego dolnego canvas.width, canvas.height
	// ctx.fillStyle = 'rgba(0,0,0,0.02)'
	// ctx.fillRect(0, 0, canvas.width, canvas.height)
	hue += 2
	handleParticles()

	requestAnimationFrame(animate) // wywoluje ta funkcje, w tym przyadku calky czas bedzie czyscic background
}

animate()
