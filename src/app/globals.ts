import { Injectable } from '@angular/core';
import { World } from 'src/model/world/World';

Injectable()
export class Globals{
    world = new World();
    token = null;
    user = null;
    trialId = null;
}
