import helloWorld from './hello-world'
import imgsrc from './assets/img-1.png'
import logoSvg from './assets/img-2.svg'
import exampleTxt from './assets/example.txt'
import jpgMap from './assets/img-3.jpg'
import './style1.css'
import './style2.less'
import Data from './assets/data.xml'
import Notes from './assets/data.csv'
import _ from 'lodash'
import './async-module'


helloWorld();

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.style.cssText = 'width: 600px; height: 200px'
img.src = logoSvg
document.body.appendChild(img2)

const block = document.createElement('div')
block.style.cssText = 'width: 200px; height: 200px; background: aliceblue'
block.classList.add('block-bg')
block.textContent = exampleTxt
document.body.appendChild(block)

const img3 = document.createElement('img')
img3.style.cssText = 'width: 600px; height: 240px; display: block; border: 1px solid red'
img.src = jpgMap
document.body.appendChild(img3)

document.body.classList.add('hello')

const span = document.createElement('span')
span.classList.add('icon')
span.innerHTML = '英雄不问出路'
document.body.appendChild(span)

console.log(Data)
console.log(Notes)

console.log(_.join(['index', 'module', 'loaded!'], ' '));
