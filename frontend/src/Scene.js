import React, { Component } from 'react';
import EaselJS from 'masteryodaeaseljs';
import GrassPainter from './painter/GrassPainter';
import SnakePainter from './painter/SnakePainter';
import MapEditorButton from './mapeditor/MapEditorButton';
import { Controller } from './logic/Controller';
import { Base } from './logic/Base';

/**
 * The app's scene part
 */
class Scene extends Component
{
    constructor()
    {
        super();
        this.controller = Controller.controller;

        this.handleResize = this.handleResize.bind(this);
    }

    /**
     * Render function
     * @returns {XML} consists of a canvas which
     * draws the game interface
     */
    render()
    {
        return (
            <div className="CanvasDiv" ref="CanvasDiv">
                <MapEditorButton/>
                <canvas id="canvas" ref="canvas" width="600" height="600" />
            </div>
        );
    }

    /**
     * Tick function
     * @param event
     * @param data consist of essential information
     */
    static tick(event, data)
    {
        if (data.count === 0)
        {
            let status = data.controller.current_state();
            // if (status === "runnable")
            // {
                data.grassPainter.update(data.controller.getMap());
                data.snakePainter.update(data.controller.getSnake());
            // }
        }
        data.count = (data.count + 1) % 12;
        data.stage.update();
    }

    /**
     * Handle resizing event
     * @param event
     */
    handleResize(event)
    {
        let fatherDiv = this.refs.CanvasDiv;
        let stage = this.refs.canvas;
        
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
        window.addEventListener("resize", this.handleResize, false);
        this.handleResize();
        let stage = new EaselJS.Stage("canvas");
        
        let grassPainter = new GrassPainter(this.controller.getMap());
        stage.addChild(grassPainter);

        let snakePainter = new SnakePainter(stage);
        let count = 0;
        let data = {
            grassPainter: grassPainter,
            snakePainter: snakePainter,
            stage: stage,
            controller: this.controller,
            count: count,
        };
        EaselJS.Ticker.on("tick", Scene.tick, null, false, data);
        EaselJS.Ticker.framerate = 24;
    }

    /**
     * This function executes when the component is going to unmount
     */
    componentWillUnmount()
    {
        window.removeEventListener("resize", this.handleResize);
    }
}

export default Scene;
