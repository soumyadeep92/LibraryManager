import React, { useState, useEffect } from 'react';
import QuizAnswers from './QuizAnswers';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fade from '@material-ui/core/Fade';

const questionsList = [
    {
        id: 1,
        question: "Hi"
    },
    {
        id: 2,
        question: "Si"
    },
    {
        id: 3,
        question: "Bi"
    },
    {
        id: 4,
        question: "Ki"
    },
    {
        id: 5,
        question: "Li"
    }
]

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar
});

// const QuizQuestions = () => {


const ScrolledAppBar = () => {
    const [scrollState, setScrollState] = useState({ scrolling: false, scrollTop: 0 });
    const [selectedAns, setSelectedAns] = useState({ questionNo: null, answerVal: null });
    const answerToQuestion = [];
    const onScroll = e => {
        setScrollState({ scrollTop: e.target.documentElement.scrollTop, scrolling: e.target.documentElement.scrollTop > scrollState.scrollTop })
    };
    withStyles(styles)(
        ({ classes }) => (
            <Fade in={!scrollState.scrolling}>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.flex}
                        >
                            My Title
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Fade>
        )
    );
}

// return (
//     withStyles(styles)(
//         ({ classes, title, buttonText }) => (
//             <div className={classes.root}>
//                 <ScrolledAppBar />                    {
// questionsList.map((obj, key) => {
//     return (
//         <div className={classes.toolbarMargin} key={obj.id}>
//             {obj.question}
//             <QuizAnswers func={(data) => setSelectedAns({ questionNo: obj.id, answerVal: data })} />
//             {console.log(selectedAns)}
//         </div>
//     )
// })
// }
//             </div>
//         )
//     )
// )
// }
const AppBarWithButtons = withStyles(styles)(
    ({ classes, title, buttonText }) => (
        <div className={classes.root}>
            <ScrolledAppBar />
            <div className={classes.toolbarMargin} />
            <ul>
                {new Array(500).fill(null).map((v, i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
        </div>
    )
);
export default AppBarWithButtons;