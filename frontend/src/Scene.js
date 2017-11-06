import React, {Component} from 'react';
import Toolbar from 'material-ui/Toolbar';
import EaselJS from 'masteryodaeaseljs';
import Element from './painter/Element';
import Background from './painter/Background';
import Role from './painter/Role';
import MapEditorButton from './mapeditor/MapEditorButton';
import LevelButton from './gameflow/LevelChoose';
import OverDialog from './gameflow/OverDialog';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import {Controller} from './logic/Controller';
import {loadToolbox} from "./utils/LoadBlockly";
import Trajectory from "./painter/Trajectory";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

/**
 * The app's scene part
 */
class Scene extends Component
{
    canvasScene;
    CanvasDiv;

    constructor()
    {
        super();
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            open: false,
            nowLevel: 1,
            dialogTitle: "Game Over",
        };
    }

    /**
     * Change the game level and update the scene
     * @param levelNum number representation of a game level
     */
    handleChooseLevel(levelNum)
    {
        this.setState({nowLevel: levelNum});
        this.stage.removeAllChildren();
        Controller.controller.switch_level(levelNum);
        //Controller.controller.getSnake().init(5, 5);
        loadToolbox(levelNum);
        this.background.reset();
        this.element.reset();
        this.trajectory.reset();
        this.role.reset();
        this.background.update(Controller.controller.getMap());
        this.trajectory.update(Controller.controller.getSnake());
        this.element.update(Controller.controller.getMap());
        this.role.update(Controller.controller.getSnake());
    }

    handleGameOver()
    {
        this.setState({
            open: true,
            dialogTitle: "Game Over"
        });
    }

    handleSuccess()
    {
        this.setState({
            open: true,
            dialogTitle: "Success!"
        });
    }

    handleRequestClose()
    {
        this.setState({open: false});
    }

    handleNextLevel()
    {
        if (this.state.nowLevel < 5)
        {
            this.handleChooseLevel(this.state.nowLevel + 1);
        }
        this.handleRequestClose();
    }

    /**
     * Render function
     * @returns {XML} consists of a canvas which
     * draws the game interface
     */
    render()
    {
        const {classes} = this.props;
        return (
            <div className = "CanvasDiv" ref = "CanvasDiv">
                <Toolbar color = "primary">
                    <LevelButton className = {classes.button}
                                 ref = "levelButton"
                                 onChooseLevel = {(levelNum) => this.handleChooseLevel(levelNum)}
                    />
                    <Button raised className = {classes.button}
                            color = "primary"
                            onClick = {() => this.handleGameOver()}
                    >
                        Test Game Over
                    </Button>
                    <MapEditorButton color = "primary"/>
                </Toolbar>
                <canvas id = "canvasScene" ref = "canvasScene" width = "600" height = "600"/>
                <OverDialog
                    open = {this.state.open}
                    dialogTitle = {this.state.dialogTitle}
                    onNext = {() => this.handleNextLevel()}
                    onLevels = {() =>
                    {
                        this.handleRequestClose();
                        this.refs.levelButton.handleClickOpen();
                    }}
                    onReplay = {() =>
                    {
                        this.handleRequestClose();
                        this.handleChooseLevel(this.state.nowLevel);
                    }}
                />

            </div>
        );
    }

    tick()
    {
        if (this.count === 0)
        {
            const controller = Controller.controller;
            const status = controller.currentState();
            if (status === "runnable")
            {
                this.background.update(controller.getMap());
                this.trajectory.update(controller.getSnake());
                this.element.update(controller.getMap());
                this.role.update(controller.getSnake());
            }
            else if (status === "fail")
            {
                this.handleGameOver();
            }
            else if (status === "success")
            {
                this.handleSuccess();
            }
        }
        this.count = (this.count + 1) % 30;
        this.stage.update();
    }

    /**
     * Handle resizing event
     * @param event
     */
    handleResize(event)
    {
        let fatherDiv = this.refs.CanvasDiv;
        let stage = this.refs.canvasScene;

        let width = fatherDiv.offsetWidth;
        let height = fatherDiv.offsetHeight;

        let minSize = width;
        if (height < width)
            minSize = height;
        stage.style.width = minSize.toString() + 'px';
        stage.style.height = minSize.toString() + 'px';
    }

    /**
     * This function executes when the component mounts
     */
    componentDidMount()
    {
        const element = this.refs.canvasScene;
        window.addEventListener("resize", this.handleResize, false);
        this.handleResize();
        this.stage = new EaselJS.Stage(element);
        this.stage.enableMouseOver(10);
        this.background = new Background(this.stage, 600, 10);
        this.trajectory = new Trajectory(this.stage, 600, 10);
        this.element = new Element(this.stage, 600, 10, true);
        this.role = new Role(this.stage, 600, 10);
        this.count = 0;
        EaselJS.Ticker.addEventListener("tick", () => this.tick());
        EaselJS.Ticker.framerate = 60;
        EaselJS.Ticker.timingMode = EaselJS.Ticker.RAF;
        this.handleChooseLevel(1);
    }

    /**
     * This function executes when the component is going to unmount
     */
    componentWillUnmount()
    {
        window.removeEventListener("resize", this.handleResize);
    }
}

export default withStyles(styles, {withTheme: true})(Scene);
