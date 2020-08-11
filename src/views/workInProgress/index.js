import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import './index.scss'

const propTypes = {
	prefixCls: PropTypes.string
}

const defaultProps = {
	prefixCls: 'view-workInProgress'
}

class WorkInProgress extends React.Component {
	render(){
		const { prefixCls } = this.props

		return (
			<div className={prefixCls}>
        <div className={`${prefixCls}-colLayout`}>
          <Card className={`${prefixCls}-colLayout-item`}>
            Work In Progress
					</Card>
				</div>
				<div className={`${prefixCls}-colLayout`}>
          <Card className={`${prefixCls}-colLayout-item`}>
            Work In Progress
					</Card>
				</div>
				<div className={`${prefixCls}-colLayout`}>
          <Card className={`${prefixCls}-colLayout-item`}>
            Work In Progress
					</Card>
				</div>
				<div className={`${prefixCls}-colLayout`}>
          <Card className={`${prefixCls}-colLayout-item`}>
            Work In Progress
					</Card>
				</div>
			</div>
		)
	}
}

WorkInProgress.propTypes = propTypes
WorkInProgress.defaultProps = defaultProps
export default WorkInProgress