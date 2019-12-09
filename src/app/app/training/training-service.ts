import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

@Injectable()

export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    private availableExercises : Exercise[] = [
        {id : 'crunches', name : 'Crunches', duration : 30, calories : 8},
        {id : 'touch-toes', name : 'Touch Toes', duration : 180, calories : 17},
        {id : 'side-lungs', name : 'Side Lungs', duration : 120, calories : 15},
        {id : 'burpees', name : 'Burpees', duration : 60, calories : 8},
    ];
    private runningExercise: Exercise;
    private exercises : Exercise[] = [];
    

    getAvailableExersices() {
        return this.availableExercises.slice();
    }
    startExercise(selectedId : string){
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    getRunningExrcise(){
        return { ...this.runningExercise };
    }
    completeExercise() {
        this.exercises.push({...this.runningExercise, date : new Date(), state : 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancelledExercise( progress : number){
        this.exercises.push({...this.runningExercise, 
            date : new Date(), 
            duration : this.runningExercise.duration * (progress / 100),
            calories : this.runningExercise.calories * (progress / 100),
            state : 'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    getCompletedOrCancelledExercices(){
        return this.exercises.slice();
    }

}