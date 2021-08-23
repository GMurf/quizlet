import {Component, useState} from 'react';
import React from 'react'
import ReactDOM from 'react-dom' 

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component{
	
	constructor(props){
		super(props);
		
		
	}
	
	el = document.createElement('div');
	
	componentDidMount(){
		modalRoot.classList.add('relative', 'z-50')
		modalRoot.appendChild(this.el)
		
	}
	
	componentWillUnmount(){
		modalRoot.classList.remove('relative', 'z-50')
		modalRoot.removeChild(this.el)
	}
	
	 
	
	
	render(){
		
		
		
		const question = this.props.cardToggle && <h1>  {this.props.appointmentSelected.ownerName}	</h1>
		const answer = !this.props.cardToggle && <p>  {this.props.appointmentSelected.aptNotes}</p>
		
		return ReactDOM.createPortal(
	
		(<div className="bg-opacity-10 bg-black fixed h-full w-full top-0 left-0 flex items-center justify-center ">
			
			<div>
			{question}
			{answer}
			
				<br />
				<div class="inline-flex">
				  <button onClick={()=>this.props.flipCard()}class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
					Flip Card
				  </button>
				 
				</div>
				<br />
				<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={this.props.onHideModal} >
						
							close modal
						
				</button>
			</div>
		</div>)
		
		,modalRoot)
			
		}
		
		
	
	
	
	
}

export default Modal