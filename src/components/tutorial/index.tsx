import { Booleans } from "./booleans";
import { Classes } from "./classes";
import { Conditions } from "./conditions";
import { Functions } from "./functions";
import { HelloWorld } from "./hello-world";
import { Keywords } from "./keywords";
import { Loops } from "./loops";
import { Operators } from "./operators";
import { Recursion } from "./recursion";
import { RunningCode } from "./running-code";
import { Strings } from "./strings";
import { Variables } from "./variables";

export function Tutorial() {
    return (
        <div className="mt-16">
            <h2 className="mb-4 text-center text-2xl font-medium sm:mb-6 sm:text-4xl">Tutorial</h2>
            <p className="text-muted text-center">
                So you want to be a sigma after all, fine, let's get you rollin'
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 md:grid-rows-[repeat(5,auto)]">
                <RunningCode />
                <HelloWorld />
                <Variables />
                <Strings />
                <Conditions />
                <Booleans />
                <Functions />
                <Loops />
                <Classes />
                <Recursion />
                <Operators />
                <Keywords />
            </div>
        </div>
    );
}
