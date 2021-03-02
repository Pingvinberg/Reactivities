import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();    
    selectedActivity: Activity | undefined = undefined;
    editMode = false;    
    loading = false;    
    loadingInitial = false;    

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();            
            activities.forEach(activity => {
                this.setActivity(activity);
            });           
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);            
        }
    }  
    
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity) {
            this.setSelectedActivity(activity);
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {this.selectedActivity = activity;})              
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    } 
    
    setLoading = (state: boolean) => {
        this.loading = state;
    } 
    
    setEditMode = (state: boolean) => {
        this.editMode = state;
    } 

    setSelectedActivity = (activity: Activity) => {
        this.selectedActivity = activity;
    }
    
    createActivity = async (activity: Activity) => { 
        this.setLoading(true);        
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.setSelectedActivity(activity);
                this.setEditMode(false);
                this.setLoading(false);
            })           
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setEditMode(false); 
                this.setLoading(false);
            })
        }
    }  
    
    updateActivity = async (activity: Activity) => {
        this.setLoading(true)
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);      
                this.setSelectedActivity(activity);
                this.setEditMode(false);
                this.setLoading(false);
            })           
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setEditMode(false);
                this.setLoading(false);
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id); 
            runInAction(() => {
                this.activityRegistry.delete(id);                
                this.setEditMode(false);               
                this.setLoading(false);
            })           
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setEditMode(false);
                this.setLoading(false);
            })
        }        
    }
}