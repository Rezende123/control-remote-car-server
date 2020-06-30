class Command {

    directionScaleMin = -50;
    directionScaleMax = 50;

    _velocity
    set velocity(velocity) {
        if (this.isValidInput(velocity)) {
            this._velocity = velocity;
        }
    }
    get velocity() { return this._velocity };

    _direction
    set direction(direction) {
        if (this.isValidInput(direction)) {
            this._direction = direction;
        }
    }
    get direction() { return this._direction };
    
    updateCommand({ velocity, angle }) {
        this.velocity = velocity;
        this.direction = this.setDirectionByAngle(angle)
    }

    isValidInput(input) {
        return input != null && input != undefined && typeof input === 'number';
    }

    setDirectionByAngle(angle) {
        const scale = (yMin, yMax, xMin, xMax, input) => {
            const percent = (input - yMin) / (yMax - yMin);
            const output = percent * (xMax - xMin) + xMin;
            return Math.round(output);
        };
        const direction = scale(
            1,
            360,
            this.directionScaleMin,
            this.directionScaleMax,
            angle
        );

        return direction;
    }
}

module.exports = Command;