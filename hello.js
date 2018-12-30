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
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='0' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='1' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='2' sqColor={this.props.gridColor}/></div>
				</div>
				<div  style={{width:"150"}}>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='3' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='4' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='5' sqColor={this.props.gridColor}/></div>
				</div>
				<div  style={{width:"150"}}>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='6' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='7' sqColor={this.props.gridColor}/></div>
					<div style={{display:"inline-block"}}><Square propTest={this.props.propTest} gridId={this.props.gridId} squareId='8' sqColor={this.props.gridColor}/></div>
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
	}
	
	test(num, threeByThreeGridNo, squareNo){
		var row = Math.floor(parseInt(threeByThreeGridNo)/3)*3 + Math.floor(parseInt(squareNo)/3);
		var col = (parseInt(threeByThreeGridNo)%3)*3 + (parseInt(squareNo)%3);
		//console.log(threeByThreeGridNo);
		//console.log(squareNo);
		//console.log(row);
		//console.log(col);
		this.grid[row][col] = num;
		//console.log(this.grid);
	}
	
	render(){
		return (
			<div>
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='0' gridColor="rgba(150, 245, 120, 0.8)"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='1' gridColor="rgba(102, 245, 79, 0.9)"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='2' gridColor="rgba(150, 245, 120, 0.8)"/></div>
				</div>
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='3' gridColor="rgba(102, 245, 79, 0.9)"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='4' gridColor="rgba(150, 245, 120, 0.8)"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='5' gridColor="rgba(102, 245, 79, 0.9)"/></div>
				</div>
				<div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='6' gridColor="rgba(150, 245, 120, 0.8)"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='7' gridColor="rgba(102, 245, 79, 0.9)"/></div>
					<div style={{display:"inline-block"}}><ThreeByThreeGrid propTest={this.test} gridId='8' gridColor="rgba(150, 245, 120, 0.8)"/></div>
				</div>
			</div>
		);
	}
	
	
	
}

ReactDOM.render(
  <SudokuGrid />,
  document.getElementById('app_container')
);