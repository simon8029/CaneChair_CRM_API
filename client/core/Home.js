import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		marginTop: theme.spacing.unit * 5
	},
	title: {
		padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 
    ${theme.spacing.unit * 2}px`,
		color: theme.palette.text.secondary
	},
	media: {
		minHeight: 330
	}
});
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Card>
					<Typography>Home Page</Typography>
					<CardMedia />
					<CardContent>
						<Typography>
							Welcome to the canechair framework home page
						</Typography>
					</CardContent>
				</Card>
			</div>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = store => {};
const mapDispatchToProps = {};

export default withStyles(styles)(Home);
