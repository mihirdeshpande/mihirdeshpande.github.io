class Square extends React.Component{

	constructor(props) {
    super(props);
    this.state = {val: ''};
	this.val = '';
	this.onChangeHandler = this.onChangeHandler.bind(this);
	//console.log('Inside sq: ');
	//console.log(this.props.propTest);
	//this.props.propTest += 1
  }

	onChangeHandler(e){
		if(!(parseInt(e.target.value)>=0 && parseInt(e.target.value)<=9)){
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
		return (
		<form style={{width:"50", height:"50", margins:"0", padding:"0", autocomplete:"off", transition:"0.6s"}}>
		  <label style={{width:"50", height:"50", margins:"0", padding:"0"}}>
			<input className='sqClass' style={{width:"50", height:"50", margins:"0", padding:"0", autocomplete:"false", textAlign:"center", fontSize:"20",backgroundColor:this.props.sqColor, borderColor:"black", borderWidth:"1", color:"rgb(186, 162, 12)"}} maxLength="1" type="text" name="name" value={this.state.val} onChange={(e) => this.onChangeHandler(e)}/>
		  </label>
		</form>
		);
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
		this.printToGUI = this.printToGUI.bind(this);
	}
	
	printToGUI(e){
		this.grid = this.solve();
		for(var i=0;i<9;i++){
			for(var j=0;j<9;j++){
				var row = Math.floor(parseInt(i)/3)*3 + Math.floor(parseInt(j)/3);
				var col = (parseInt(i)%3)*3 + (parseInt(j)%3);
				this.refs[i].refs[j].setState({val:this.grid[row][col]});
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
	
	solveSudoku(grid, row, col){
		// Find next unassigned cell
		var cell = this.getNextCell(grid, row, col);
		console.log(cell);
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
	
	solve(){
		var gridCopy = [];
		for (var i = 0; i < this.grid.length; i++){
			gridCopy[i] = this.grid[i].slice();
		}
		var result = this.solveSudoku(gridCopy, 0, 0);
		console.log(result);
		return gridCopy;
	}
	
	render(){
		return (
			<div ref="sudoku">
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='0' gridColor="rgba(150, 245, 120, 0.8)" ref="0"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='1' gridColor="rgba(102, 245, 79, 0.9)" ref="1"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='2' gridColor="rgba(150, 245, 120, 0.8)" ref="2"/></div>
				</div>
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='3' gridColor="rgba(102, 245, 79, 0.9)" ref="3"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='4' gridColor="rgba(150, 245, 120, 0.8)" ref="4"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='5' gridColor="rgba(102, 245, 79, 0.9)" ref="5"/></div>
				</div>
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='6' gridColor="rgba(150, 245, 120, 0.8)" ref="6"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='7' gridColor="rgba(102, 245, 79, 0.9)" ref="7"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='8' gridColor="rgba(150, 245, 120, 0.8)" ref="8"/></div>
				</div>
				<button className="btn-lg" onClick={(e) => this.printToGUI(e)}>Solve</button>
			</div>
		);
	}
	
	
	
}

ReactDOM.render(
  <SudokuGrid />,
  document.getElementById('app_container')
);
