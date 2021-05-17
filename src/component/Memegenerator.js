import React,{Component} from "react";
import './meme.css';

class Memegenerator extends Component{
	constructor(){
		super();
		this.state={
		  topText:'',
		  bottomText: '',
		  randomImg:'http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png',
		  allMemeImgs:[]
		}
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		fetch('https://api.imgflip.com/get_memes')
		.then(response => response.json())
		.then(response => {
		    const {memes} = response.data
			this.setState({allMemeImgs: memes})
		})
	}

	handleOnChange(event){
		const {name,value} = event.target;
		this.setState({
			[name]:value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
		const randomImg = this.state.allMemeImgs[randomNum].url;
		this.setState({randomImg:randomImg})
	}


	render(){
		return(
			<div class='mainBody'>
			  <form onSubmit={this.handleSubmit}>
			     <input type='text' name='topText' value={this.state.topText} placeHolder="Top Text" onChange={this.handleOnChange}/>
				 <input type='text' name='bottomText' value={this.state.bottomText} placeHolder="Bottom Text" onChange={this.handleOnChange}/>
                 <button>Gen</button>
			  </form>	
			  <br/>
			  <br/>
			  <div class='imgDiv'>
			     <img src={this.state.randomImg} height='300' width='300'/>
				  <h2 class='topText'>{this.state.topText}</h2>
				  <h2 class='bottomText'>{this.state.bottomText}</h2>
			  </div>
		    </div>
		)
	}
}

export default Memegenerator;