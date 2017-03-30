import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

export default class Circle extends Component{
    componentDidMount() {
        this.drawGreatCircle();
    }



    //绘制大圆
    drawGreatCircle() {
        let canvas = findDOMNode(this.refs.canvas);
        let ctx = canvas.getContext('2d');
        let _this = this;
        let {width, greatColor, lineWidth , smallColor, perent, animated, x, after} = this.props;
        canvas.width = width;
        canvas.height = width;

        if (!animated) return fill(perent, ctx);

        this.fill(x, ctx);
        !function animate() {
            if (++x > perent) return after && after();
            setTimeout(animate, 10);
            _this.clearFill(ctx, width, width);
            _this.fill(x, ctx);
        }();
        
    }

    //清除画布
    clearFill(ctx, width) {
        ctx.clearRect(0, 0, this.props.width, this.props.width);
    }

    //绘制大圆
    fillBG(ctx) {
        ctx.beginPath();
        ctx.lineWidth = this.props.lineWidth;
        ctx.strokeStyle = this.props.greatColor;
        ctx.arc(this.props.width / 2, this.props.width / 2, this.props.width/2-this.props.lineWidth/2, 0, 2 * Math.PI);
        ctx.stroke();
    }

    fillArc(x, ctx) {
        ctx.beginPath();
        ctx.lineWidth = this.props.lineWidth;
        ctx.strokeStyle = this.props.smallColor;
        ctx.arc(this.props.width / 2, this.props.width / 2, this.props.width/2-this.props.lineWidth/2, -90 * Math.PI / 180, (x * 3.6 - 90) * Math.PI / 180);
        ctx.stroke();
    }

    fill(x, ctx) {
        this.fillBG(ctx);
        this.fillArc(x, ctx);
        this.fillText(x, ctx);
    }

    fillText(x, ctx) {
        ctx.font=this.props.textSize + 'px Arial';
        ctx.fillStyle = this.props.greatColor;
        ctx.textBaseline = "middle";
        ctx.textAlign = 'center';
        ctx.fillText(x/10, this.props.width / 2, this.props.width / 2);
    }

    

    render() {
        return (
            <canvas ref="canvas"></canvas>
        )
    }
} 

Circle.defaultProps = {
        width: 40,
        greatColor: '#fff',
        smallColor: 'red',
        lineWidth: 4,
        perent: 50,
        x: 0,
        animated: true,
        after: function() {},
        textSize: "20"
    }
Circle.propTypes = {
    width: PropTypes.number,
    greatColor:  PropTypes.string,
    smallColor: PropTypes.string,
    lineWidth: PropTypes.number,
    perent: PropTypes.number,
    x: PropTypes.number,
    animated: PropTypes.bool,
    after: PropTypes.func,
    textSize: PropTypes.string
}