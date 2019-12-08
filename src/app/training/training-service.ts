import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

@Injectable()

export class TrainingService {
    private availableExercises : Exercise[] = [
        {id : 'crunches', name : 'Crunches', duration : 30, calories : 8},
        {id : 'touch-toes', name : 'Touch Toes', duration : 180, calories : 17},
        {id : 'side-lungs', name : 'Side Lungs', duration : 120, calories : 15},
        {id : 'burpees', name : 'Burpees', duration : 60, calories : 8},
    ];
    private runningExercise: Exercise;
    exerciseChange : Subject<Exercise>;

    getAvailableExersices() {
        return this.availableExercises.slice();
    }
    startExercise(selectedId : string){
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChange.next({ ...this.runningExercise });
    }

    getRunningExrcise(){
        return { ...this.runningExercise };
    }

}