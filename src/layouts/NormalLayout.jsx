import React from 'react'
import './NormalLayout.scss'

class NormalLayout extends React.Component {
	render(){
		const { children } = this.props
		return (
			<div className="normalLayout">
				{children}
			</div>
		)
	}
}

export default NormalLayout