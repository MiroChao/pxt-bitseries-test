enum GrovePort {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2,
    //% block="P8"
    P8,
    //% block="P16"
    P16
}

enum AnalogPort {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

enum DistanceUnit {
    //% block="cm"
    cm,
    //% block="inch"
    inch
}

/**
 * Provides access to BitTest blocks for micro: bit functionality.
 */
//% color=190 icon="\uf126" block= "BitTest"
//% groups="['Analog', 'Digital', 'I2C', 'Grove Modules']"
namespace BitTest {
    export class SelectPins {
        grove: GrovePort;
        analogIO: AnalogPort;
        unit: DistanceUnit;
        Din: number;
        Dout: number;
        high: boolean;
        Ain: number;
        Aout: number;
        PWMvalue: number;
        durationPulse: number;

        //call this function to read from or write to digital pins
        select_grove_port(mode: number) {
            //read from specified digital pin
            if (mode == 0) {
                if (this.grove == GrovePort.P0) {
                    this.Din = pins.digitalReadPin(DigitalPin.P0);
                } else if (this.grove == GrovePort.P1) {
                    this.Din = pins.digitalReadPin(DigitalPin.P1);
                } else if (this.grove == GrovePort.P2) {
                    this.Din = pins.digitalReadPin(DigitalPin.P2);
                } else if (this.grove == GrovePort.P8) {
                    this.Din = pins.digitalReadPin(DigitalPin.P8);
                } else if (this.grove == GrovePort.P16) {
                    this.Din = pins.digitalReadPin(DigitalPin.P16);
                }
            }
            //write to specified digital pin
            else if (mode == 1) {
                if (this.high == true) {
                    this.Dout = 1;
                } else {
                    this.Dout = 0;
                }
                if (this.grove == GrovePort.P0) {
                    pins.digitalWritePin(DigitalPin.P0, this.Dout);
                } else if (this.grove == GrovePort.P1) {
                    pins.digitalWritePin(DigitalPin.P1, this.Dout);
                } else if (this.grove == GrovePort.P2) {
                    pins.digitalWritePin(DigitalPin.P2, this.Dout);
                } else if (this.grove == GrovePort.P8) {
                    pins.digitalWritePin(DigitalPin.P8, this.Dout);
                } else if (this.grove == GrovePort.P16) {
                    pins.digitalWritePin(DigitalPin.P16, this.Dout);
                }
            }
            //get the duration of a pulse at a specified digital pin
            else if (mode == 2) {
                if (this.high == true) {
                    this.Dout = 1;
                } else {
                    this.Dout = 0;
                }
                if (this.grove == GrovePort.P0) {
                    this.durationPulse = pins.pulseIn(DigitalPin.P0, PulseValue.High, 50000); // Max duration 50 ms;
                } else if (this.grove == GrovePort.P1) {
                    this.durationPulse = pins.pulseIn(DigitalPin.P0, PulseValue.High, 50000);
                } else if (this.grove == GrovePort.P2) {
                    pins.digitalWritePin(DigitalPin.P2, this.Dout);
                } else if (this.grove == GrovePort.P8) {
                    pins.digitalWritePin(DigitalPin.P8, this.Dout);
                } else if (this.grove == GrovePort.P16) {
                    pins.digitalWritePin(DigitalPin.P16, this.Dout);
                }
            }
        }

        //call this function to read from or write to analog pins
        select_analog_port(mode: number) {
            //read from specified analog pin
            if (mode == 0) {
                if (this.analogIO == AnalogPort.P0) {
                    this.Ain = pins.analogReadPin(AnalogPin.P0);
                } else if (this.analogIO == AnalogPort.P1) {
                    this.Ain = pins.analogReadPin(AnalogPin.P1);
                } else if (this.analogIO == AnalogPort.P2) {
                    this.Ain = pins.analogReadPin(AnalogPin.P2);
                }
            }

            //write value to specified analog pin
            else if (mode == 1) {
                if (this.analogIO == AnalogPort.P0) {
                    pins.analogWritePin(AnalogPin.P0, this.Aout);
                } else if (this.analogIO == AnalogPort.P1) {
                    pins.analogWritePin(AnalogPin.P1, this.Aout);
                } else if (this.analogIO == AnalogPort.P2) {
                    pins.analogWritePin(AnalogPin.P2, this.Aout);
                }
            }

            // set pwm pusle at specified analog pin
            else if (mode == 2) {
                if (this.analogIO == AnalogPort.P0) {
                    pins.analogSetPeriod(AnalogPin.P0, this.PWMvalue);
                } else if (this.analogIO == AnalogPort.P1) {
                    pins.analogSetPeriod(AnalogPin.P1, this.PWMvalue);
                } else if (this.analogIO == AnalogPort.P2) {
                    pins.analogSetPeriod(AnalogPin.P2, this.PWMvalue);
                }
            }
        }
    }

    let selectPins: SelectPins;

    /**
    * read the value of a digital input
    */
    //% blockId=measureInCentimeters
    //% block="Ultrasonic Sensor at $grove| distance in $Unit"
    //% grove.fieldEditor="gridpicker"
    //% grove.fieldOptions.width=200
    //% grove.fieldOptions.columns=3
    //% group="Grove Modules"
    //% weight=100
    export function measureInCentimeters(grove: GrovePort, Unit: DistanceUnit): number {
        let duration = 0;
        let distance = 0;
        let distanceBackup = 0;

        selectPins.grove = grove;

        selectPins.high = false;
        selectPins.select_grove_port(1);
        control.waitMicros(2);
        selectPins.high = true;
        selectPins.select_grove_port(1);
        control.waitMicros(10);
        selectPins.high = false;
        selectPins.select_grove_port(1);

        if (selectPins.grove == GrovePort.P0) {
            duration = pins.pulseIn(DigitalPin.P0, PulseValue.High, 50000); // Max duration 50 ms;
        } else if (selectPins.grove == GrovePort.P1) {
            duration = pins.pulseIn(DigitalPin.P1, PulseValue.High, 50000);
        } else if (selectPins.grove == GrovePort.P2) {
            duration = pins.pulseIn(DigitalPin.P2, PulseValue.High, 50000);
        } else if (selectPins.grove == GrovePort.P8) {
            duration = pins.pulseIn(DigitalPin.P8, PulseValue.High, 50000);
        } else if (selectPins.grove == GrovePort.P16) {
            duration = pins.pulseIn(DigitalPin.P16, PulseValue.High, 50000);
        }

        if (Unit == DistanceUnit.cm) distance = duration * 153 / 58 / 100;
        else distance = duration * 153 / 148 / 100;

        if (distance > 0) distanceBackup = distance;
        else distance = distanceBackup;
        basic.pause(50);

        return distance;
    }

    /**
    * read the value of a digital input
    */
    //% blockId=read_Din_value
    //% block="digital read pin $grove"
    //% Din.fieldEditor="gridpicker"
    //% Din.fieldOptions.width=200
    //% Din.fieldOptions.columns=3
    //% group="Digital"
    export function read_Din_value(grove: GrovePort): number {
        selectPins.grove = grove;
        selectPins.select_grove_port(0);
        return selectPins.Din;
    }

    /**
     * read the status of a digital input
     */
    //% blockId=read_Din_status
    //% block="digital pin $grove| is $high"
    //% grove.fieldEditor="gridpicker"
    //% grove.fieldOptions.width=200
    //% grove.fieldOptions.columns=3
    //% high.shadow="toggleHighLow"
    //% high.defl="true"
    //% group="Digital"
    //% weight=10
    export function read_Din_status(grove: GrovePort, high: boolean): boolean {
        selectPins.grove = grove;
        selectPins.select_grove_port(0);
        if ((high == true && selectPins.Din == 1) || (high == false && selectPins.Din == 0)) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * set the status of a digital output to high or low
    */
    //% blockId=set_Dout
    //% block="set digital pin $grove| to $high"
    //% grove.fieldEditor="gridpicker"
    //% grove.fieldOptions.width=200
    //% grove.fieldOptions.columns=3
    //% high.shadow="toggleHighLow"
    //% high.defl="true"
    //% group="Digital"
    //% weight=10
    export function set_Dout(grove: GrovePort, high: boolean) {
        selectPins.grove = grove;
        selectPins.high = high;
        selectPins.select_grove_port(1);
    }

    /**
    * read the analog inputs
    */
    //% blockId=read_Ain
    //% block="analog read pin $analogIO"
    //% analogIO.fieldEditor="gridpicker"
    //% analogIO.fieldOptions.width=200
    //% analogIO.fieldOptions.columns=3
    //% group="Analog"
    //% weight=50
    export function read_Ain(analogIO: AnalogPort): number {
        selectPins.analogIO = analogIO;
        selectPins.select_analog_port(0);
        return selectPins.Ain;
    }

    /**
    * read the analog inputs and convert the value to the specified range
    */
    //% blockId=convert_Ain
    //% block="map pin $analogIO|to low $low_value|high $high_value"
    //% analogIO.fieldEditor="gridpicker"
    //% analogIO.fieldOptions.width=200
    //% analogIO.fieldOptions.columns=3
    //% group="Analog"
    //% weight=40
    export function convert_Ain(analogIO: AnalogPort, low_value: number, high_value: number): number {
        selectPins.analogIO = analogIO;
        selectPins.select_analog_port(0);
        return Math.map(selectPins.Ain, 0, 1023, low_value, high_value);
    }

    /**
    * write value to the analog ports
    */
    //% blockId=write_analog
    //% block="analog write pin $analogIO| to $Aout"
    //% analogIO.fieldEditor="gridpicker"
    //% analogIO.fieldOptions.width=200
    //% analogIO.fieldOptions.columns=3
    //% Aout.min=0 value.max=1023
    //% Aout.defl=1023
    //% group="Analog"
    //% weight=30
    export function write_analog(analogIO: AnalogPort, Aout: number) {
        selectPins.analogIO = analogIO;
        selectPins.Aout = Aout;
        selectPins.select_analog_port(1);
    }

    /**
    * Configure the period of Pulse Width Modulation (PWM) on the specified analog pin to a given value in "microseconds". Before you call this function, you should set the specified pin as analog output using "analog write pin".
    */
    //% blockId=config_PWM
    //% block="analog set period pin $analogIO|(PWM) to (us) $PWMvalue"
    //% analogIO.fieldEditor="gridpicker"
    //% analogIO.fieldOptions.width=200
    //% analogIO.fieldOptions.columns=3
    //% PWMvalue.defl=20000
    //% group="Analog"
    //% weight=20
    export function config_PWM(analogIO: AnalogPort, PWMvalue: number) {
        selectPins.analogIO = analogIO;
        selectPins.PWMvalue = PWMvalue;
        selectPins.select_analog_port(2);
    }

    /**
     * Read one number to a 7-bit address
     */
    //% blockId=read_i2c
    //% block="i2c read number at address $add|of format $format|repeated $yes"
    //% format.fieldEditor="gridpicker"
    //% format.fieldOptions.width=200
    //% format.fieldOptions.columns=4
    //% yes.shadow="toggleYesNo"
    //% group="I2C"
    //% inlineInputMode=inline
    export function read_i2c(add: number, format: NumberFormat, yes: boolean): number {
        return pins.i2cReadNumber(add, format, yes)
    }

    /**
    * Write one number to a 7-bit address
    */
    //% blockId=write_i2c
    //% block="i2c wrtie number $|at address $add|with value $value|of format $format|repeated $yes"
    //% format.fieldEditor="gridpicker"
    //% format.fieldOptions.width=200
    //% format.fieldOptions.columns=4
    //% yes.shadow="toggleYesNo"
    //% group="I2C"
    //% weight=40
    export function write_i2c(add: number, value: number, format: NumberFormat, yes: boolean) {
        pins.i2cWriteNumber(add, value, format, yes)
    }
}