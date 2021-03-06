import {DrawingTypeSelector} from "./drawing-type-selector";
import {Cell} from "./cell";
import {DrawingType} from "./enum/drawing-type.enum";



//Init
let drawingSelector = new DrawingTypeSelector();
drawingSelector.init();


let canvas = document.getElementById('canvas');
canvas.onmousedown = startDrawing;
canvas.onmouseup = stopDrawing;
canvas.onmouseleave = stopDrawing;

let cells: Array<Array<Cell>> = [];
let currentCell:Cell = null;
let maxCellRow = 50;

for(let i = 0; i < maxCellRow; i++){
	let row = [];

	for(let j = 0; j < maxCellRow; j++){
		let node = document.createElement('div');
		node.className = 'cell';
		canvas.appendChild(node);
		let cell = new Cell(i, j, node);
		node.onmouseover = function(){mouseOver(cell);};

		row.push(cell);
	}

	cells.push(row);
}

for(let i = 0; i < maxCellRow; i++){
	for(let j = 0; j < maxCellRow; j++){
		cells[i][j].setSiblings(
			cells[i][j-1]?cells[i][j-1]:null,
			cells[i-1]?cells[i-1][j]:null,
			cells[i][j+1]?cells[i][j+1]:null,
			cells[i+1]?cells[i+1][j]:null
		);
	}
}

function mouseOver(cell:Cell){
	currentCell = cell;
}

let currentInterval:any = null;
function startDrawing(){
	if(currentInterval !== null){
		return;
	}
	execute();
	currentInterval = setInterval(execute, 10);
}
function stopDrawing(){
	if(currentInterval !== null){
		clearInterval(currentInterval);
		currentInterval = null;
	}
}
function execute(){
	switch (drawingSelector.currentType) {
		case DrawingType.WATER:
			currentCell.setLoad(100);
			break;
		case DrawingType.WALL:
			currentCell.setAsWall();
			break;
		case DrawingType.DELETE:
			currentCell.erase();
			break;
		default:
			break;
	}
}