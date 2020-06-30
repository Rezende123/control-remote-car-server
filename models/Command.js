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
        const scale = (currentMin, currentMax, goalMin, goalMax, input) => {
            const percent = (input - currentMin) / (currentMax - currentMin);
            const output = percent * (goalMax - goalMin) + goalMin;
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