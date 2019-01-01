class Square extends React.Component{

	constructor(props) {
    super(props);
    this.state = {val: '', disabled:false};
	this.val = '';
	this.onChangeHandler = this.onChangeHandler.bind(this);
	//console.log('Inside sq: ');
	//console.log(this.props.propTest);
	//this.props.propTest += 1
  }

	onChangeHandler(e){
		if(!(parseInt(e.target.value)>=1 && parseInt(e.target.value)<=9)){
			//console.log("kmksmdkms");
			this.setState({val: ''});
			this.val = '';
		}else{
			//console.log("##");
			this.setState({val: e.target.value});
			this.val = e.target.value;
		}	
		//console.log(this.val);
		this.props.propTest(this.val, this.props.gridId, this.props.squareId);
	}
	
	

	render(){
		var enabledSquare = (
		<form style={{width:"50", height:"50", margins:"0", padding:"0", transition:"0.6s"}}>
		  <label style={{width:"50", height:"50", margins:"0", padding:"0"}}>
			<input className='sqClass' style={{width:"50", height:"50", margins:"0", padding:"0", autoComplete:"off", textAlign:"center", fontSize:"20",backgroundColor:this.props.sqColor, borderColor:"black", borderWidth:"1", color:"rgb(91, 44, 0)"}} maxLength="1" type="text" name="name" value={this.state.val} onChange={(e) => this.onChangeHandler(e)}/>
		  </label>
		</form>
		);
		
		var disabledSquare = (
		<form style={{width:"50", height:"50", margins:"0", padding:"0", transition:"0.6s", pointerEvents:"none"}}>
		  <label style={{width:"50", height:"50", margins:"0", padding:"0"}}>
			<input style={{width:"50", height:"50", margins:"0", padding:"0", autoComplete:"off", textAlign:"center", fontSize:"20",backgroundColor:"rgba(175, 175, 175, 1)", borderColor:"black", borderWidth:"1", color:"rgb(91, 44, 0)", cursor:'not-allowed'}} maxLength="1" type="text" name="name" value={this.state.val} onChange={(e) => this.onChangeHandler(e)} disabled/>
		  </label>
		</form>
		);
		
		if(this.state.disabled === true){
			return disabledSquare;
		}
		return enabledSquare;
	}
}

class ThreeByThreeGrid extends React.Component{
	constructor(props){
		super(props);
		//console.log('Inside 3*3: ');
		//console.log(this.props.propTest);
	}
	
	render(){
		return (
			<div>
				<div style={{width:"150"}}>
					<div style={{display:"inline-block"}}><Square ref="0" propTest={this.props.propTest} gridId={this.props.gridId} squareId='0' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square ref="1" propTest={this.props.propTest} gridId={this.props.gridId} squareId='1' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square ref="2" propTest={this.props.propTest} gridId={this.props.gridId} squareId='2' sqColor={this.props.gridColor}/></div>
				</div>
				<div  style={{width:"150"}}>
					<div style={{display:"inline-block"}}><Square ref="3" propTest={this.props.propTest} gridId={this.props.gridId} squareId='3' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square ref="4" propTest={this.props.propTest} gridId={this.props.gridId} squareId='4' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square ref="5" propTest={this.props.propTest} gridId={this.props.gridId} squareId='5' sqColor={this.props.gridColor}/></div>
				</div>
				<div  style={{width:"150"}}>
					<div style={{display:"inline-block"}}><Square ref="6" propTest={this.props.propTest} gridId={this.props.gridId} squareId='6' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square ref="7" propTest={this.props.propTest} gridId={this.props.gridId} squareId='7' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square ref="8" propTest={this.props.propTest} gridId={this.props.gridId} squareId='8' sqColor={this.props.gridColor}/></div>
				</div>
			</div>
		);
	}
}

class SudokuGrid extends React.Component{
	constructor(props){
		super(props);
		//this.test = '0';
		this.test = this.test.bind(this);
		this.grid = [['','','','','','','','',''], 
		 ['','','','','','','','',''],
		 ['','','','','','','','',''],
		 ['','','','','','','','',''],
		 ['','','','','','','','',''],
		 ['','','','','','','','',''],
		 ['','','','','','','','',''],
		 ['','','','','','','','',''],
		 ['','','','','','','','','']
		];
		this.solve = this.solve.bind(this);
		this.clearGrid = this.clearGrid.bind(this);
		this.newGrid = this.newGrid.bind(this);
		
		//this.newGridFast = this.newGridFast.bind(this);
	}
	
	clearGridArray(){
		this.grid = [['','','','','','','','',''], 
					 ['','','','','','','','',''],
					 ['','','','','','','','',''],
					 ['','','','','','','','',''],
					 ['','','','','','','','',''],
					 ['','','','','','','','',''],
					 ['','','','','','','','',''],
					 ['','','','','','','','',''],
					 ['','','','','','','','','']
					];
	}
	
	clearGrid(e){
		this.clearGridArray();
		this.printToGUI('clearGrid');
	}
	
	getRandomBetweenRange(min, max){
		return Math.floor((Math.random() * (max-min)) + min);
	}
	
	getRandomPermutation(min, max){
		var orgList = [];
		var permList = [];
		for (var i=min; i<=max; i++){
			orgList.push(i);
		}
		for (var i=min; i<=max; i++){
			var j = this.getRandomBetweenRange(0, orgList.length-1);
			var elm = orgList[j];
			orgList.splice(j, 1);
			permList.push(elm);
		}
		return permList;
	}
	
	newGrid(level){
		var initProblem = false;
		while(!initProblem){
			this.clearGridArray();
			var cnt = 0;
			var row = 0;
			var col = 0;
			var val = 0;
			while(cnt<8){
				row = this.getRandomBetweenRange(0,8);
				col = this.getRandomBetweenRange(0,8);
				val = this.getRandomBetweenRange(1,9);
				this.grid[row][col] = val.toString();
				if (this.isSudokuGridValid(this.grid)){
					cnt++;
				}
				else{
					this.grid[row][col] = '';
				}				
			}
			initProblem = this.solveSudoku(this.grid, 0, 0);
		}
		
		var list = this.getRandomPermutation(0, 80);
		//console.log(list);
		//console.log('Init grid: ' + this.grid);
		var upperBound = list.length;
		if (level === 'easy'){
			upperBound = Math.floor(upperBound/3);
		}
		else if (level === 'medium'){
			upperBound = Math.floor(upperBound/2);
		}
		for (var i = 0; i<upperBound; i++){
			var elm = this.grid[Math.floor(parseInt(list[i])/9)][parseInt(list[i])%9];
			this.grid[Math.floor(parseInt(list[i])/9)][parseInt(list[i])%9] = '';
			var solutions = [];
			this.noOfSudokuSolutions(this.grid, 0, 0, solutions);
			//console.log('After: ' + this.grid);
			if (solutions.length > 1){
				this.grid[Math.floor(parseInt(list[i])/9)][parseInt(list[i])%9] = elm;
			}
		}
		this.printToGUI('newGrid');
	}
	
	newGridFast(e){
		this.clearGridArray();
		var solutions = [];
		this.fastSudokuGenerator(this.grid, 0, 0, solutions, '1'); 
		this.printToGUI('newGrid');
	}
	
	printToGUI(callFrom='default'){
		//this.grid = this.solve();
		for(var i=0;i<9;i++){
			for(var j=0;j<9;j++){
				var row = Math.floor(parseInt(i)/3)*3 + Math.floor(parseInt(j)/3);
				var col = (parseInt(i)%3)*3 + (parseInt(j)%3);
				if (callFrom === 'newGrid'){
					this.refs[i].refs[j].setState({val:this.grid[row][col], disabled:!(this.grid[row][col]==='')});
				}
				else if (callFrom === 'clearGrid'){
					this.refs[i].refs[j].setState({val:this.grid[row][col], disabled:false});
				}
				else{
					this.refs[i].refs[j].setState({val:this.grid[row][col]});
				}
			}
		}
		
	}
	
	test(num, threeByThreeGridNo, squareNo){
		var row = Math.floor(parseInt(threeByThreeGridNo)/3)*3 + Math.floor(parseInt(squareNo)/3);
		var col = (parseInt(threeByThreeGridNo)%3)*3 + (parseInt(squareNo)%3);
		this.grid[row][col] = num;
	}
	
	getNextCell(grid, row, col){
		for(var i = row; i < 9; i++){
			for(var j = 0; j < 9; j++){
				if (grid[i][j] === ''){
					return [i, j];
				}
				
			}
		}
		return [null, null];
	}
	
	isValid(grid, row, col, val){
		// check in row
		if (val === ''){
			return true;
		}
		for(var i=0; i<9;i++){
			if (grid[row][i] === val){
				return false;
			}
		}
		
		// check in col
		for(var i=0; i<9;i++){
			if (grid[i][col] === val){
				return false;
			}
		}
		
		// check in 3*3 grid
		var rowStart = Math.floor(parseInt(row)/3)*3;
		var colStart = Math.floor(parseInt(col)/3)*3;
		for(var i=0; i<3;i++){
			for(var j=0; j<3;j++){
				if (grid[rowStart+i][colStart+j] === val){
					return false;
				}
			}
		}
		
		return true;
	}

	noOfSudokuSolutions(grid, row, col, allSolutions){
		// Find next unassigned cell
		var cell = this.getNextCell(grid, row, col);
		//console.log(cell);
		if (cell[0] == null){
			var gridCopy = [];
			for (var i = 0; i < grid.length; i++){
				gridCopy[i] = grid[i].slice();
			}
			allSolutions.push(gridCopy);
			return;
		}
		for (var i=1; i<=9;i++){
			if (this.isValid(grid, cell[0], cell[1], i.toString())){
				grid[cell[0]][cell[1]] = i.toString();
				this.noOfSudokuSolutions(grid, cell[0], cell[1], allSolutions);
				if (allSolutions.length >= 2){
					grid[cell[0]][cell[1]] = '';
					return;
				}
				grid[cell[0]][cell[1]] = '';
			}
		}
	}
	
	solveSudoku(grid, row, col){
		// Find next unassigned cell
		var cell = this.getNextCell(grid, row, col);
		//console.log(cell);
		if (cell[0] == null){
			return true;
		}
		for (var i=1; i<=9;i++){
			if (this.isValid(grid, cell[0], cell[1], i.toString())){
				grid[cell[0]][cell[1]] = i.toString();
				if (this.solveSudoku(grid, cell[0], cell[1])){
					return true;
				}
				grid[cell[0]][cell[1]] = '';
			}
		}
		
		return false;
	}
	
	isSudokuGridValid(grid){
		for (var i=0; i<9; i++){
			for (var j=0; j<9; j++){
				var val = grid[i][j];
				grid[i][j] = '';
				if (!this.isValid(grid, i, j, val)){
					grid[i][j] = val;
					return false;
				}
				grid[i][j] = val;
			}
		}
		return true;
	}
	
	solve(e){
		var gridCopy = [];
		for (var i = 0; i < this.grid.length; i++){
			gridCopy[i] = this.grid[i].slice();
		}
		//check if input is valid
		var valid = this.isSudokuGridValid(gridCopy);
		if (!valid){
			console.log('Wrong input!!!');
			return gridCopy;
		}
		var result = this.solveSudoku(gridCopy, 0, 0);
		//console.log(result);
		this.grid = gridCopy;
		this.printToGUI();
	}
	
	render(){
		return (
			<div ref="sudoku">
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='0' gridColor="rgba(160, 252, 153, 0.8)" ref="0"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='1' gridColor="rgba(0, 199, 255, 0.8)" ref="1"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='2' gridColor="rgba(160, 252, 153, 0.8)" ref="2"/></div>
				</div>
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='3' gridColor="rgba(0, 199, 255, 0.8)" ref="3"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='4' gridColor="rgba(160, 252, 153, 0.8)" ref="4"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='5' gridColor="rgba(0, 199, 255, 0.8)" ref="5"/></div>
				</div>
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='6' gridColor="rgba(160, 252, 153, 0.8)" ref="6"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='7' gridColor="rgba(0, 199, 255, 0.8)" ref="7"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='8' gridColor="rgba(160, 252, 153, 0.8)" ref="8"/></div>
				</div>
				<button className="btn-lg" onClick={(e) => this.newGrid('easy')}>Easy</button>
				<button className="btn-lg" onClick={(e) => this.newGrid('medium')}>Medium</button>
				<button className="btn-lg" onClick={(e) => this.newGrid('hard')}>Hard</button>
				<button className="btn-lg" onClick={(e) => this.solve(e)}>Solve</button>
				<button className="btn-lg" onClick={(e) => this.clearGrid(e)}>Clear Grid</button>
				
			</div>
		);
	}	
}

ReactDOM.render(
  <SudokuGrid />,
  document.getElementById('app_container')
);
