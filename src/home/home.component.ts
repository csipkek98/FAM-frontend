import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Freegame } from './freegame.model';
import { FreegameService } from './freegames.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{
  freegames: Freegame[] = [{
    id: 0,
    title: "",
    thumbnail: "",
    short_description: "",
    game_url: "",
    genre: "" ,
    platform: "",
    publisher: "",
    developer: "",
    releaseDate: 0,
    freetogame_profile_url: "",}];
  genre=
  {
    "mmo": new FormControl(false),
    "mmorpg": new FormControl(false),
    "shooter": new FormControl(false),
    "strategy": new FormControl(false),
    "moba": new FormControl(false),
    "battle-royale": new FormControl(false),
    "card": new FormControl(false),
    "racing": new FormControl(false),
    "sports": new FormControl(false),
    "fighting": new FormControl(false),
  }

  graphics=
  {
    "2d": new FormControl(false),
    "3d": new FormControl(false),
  }

  combat=
  {
    "pve": new FormControl(false),
    "pvp": new FormControl(false),
  }

  gameplay=
  {
    "turn-based": new FormControl(false),
    "real-time": new FormControl(false)
  }

  theme=
  {
    "anime": new FormControl(false),
    "fantasy": new FormControl(false),
    "sci-fi": new FormControl(false),
    "military": new FormControl(false),
    "horror": new FormControl(false),
  }

  tags =
  {
  "social": new FormControl(false),
  "sandbox": new FormControl(false),
  "open-world": new FormControl(false),
  "survival": new FormControl(false),
  "pixel": new FormControl(false),
  "voxel": new FormControl(false),
  "zombie": new FormControl(false),
  "first-person": new FormControl(false),
  "third-Person": new FormControl(false),
  "top-down": new FormControl(false),
  "tank": new FormControl(false),
  "space": new FormControl(false),
  "sailing": new FormControl(false),
  "side-scroller": new FormControl(false),
  "superhero": new FormControl(false),
  "permadeath": new FormControl(false),
  "mmofps": new FormControl(false),
  "mmotps": new FormControl(false),
  "action-rpg": new FormControl(false),
  "action": new FormControl(false),
  "martial-arts": new FormControl(false),
  "flight": new FormControl(false),
  "low-spec": new FormControl(false),
  "tower-defense": new FormControl(false),
  "mmorts": new FormControl(false),
}
      
      

  searchForm = new FormGroup({
    platform: new FormControl(false),
    genre: new FormGroup(this.genre),
    graphics: new FormGroup(this.graphics),
    combat: new FormGroup(this.combat),
    gameplay: new FormGroup(this.gameplay),
    theme: new FormGroup(this.theme),
    tags: new FormGroup(this.tags)
  });

  platformControlNames: string[] = [];
  genreControlNames: string[] = [];
  graphicsControlNames: string[] = [];
  combatControlNames: string[] = [];
  gameplayControlNames: string[] = [];
  themeControlNames: string[] = [];
  tagsControlNames: string[] = [];


  constructor(private freegameService: FreegameService) {
  
  }

  ngOnInit() {
    this.freegameService.getFreegames().subscribe(freegames => {
      this.freegames = freegames;
    });
    this.genreControlNames = Object.keys((this.searchForm.get('genre') as FormGroup)?.controls)
    this.graphicsControlNames = Object.keys((this.searchForm.get('graphics') as FormGroup)?.controls)
    this.combatControlNames = Object.keys((this.searchForm.get('combat') as FormGroup)?.controls)
    this.gameplayControlNames = Object.keys((this.searchForm.get('gameplay') as FormGroup)?.controls)
    this.themeControlNames = Object.keys((this.searchForm.get('theme') as FormGroup)?.controls)
    this.tagsControlNames = Object.keys((this.searchForm.get('tags') as FormGroup)?.controls)
  }

  onSubmit() {
    let platform = ""
    if(this.searchForm.get('platform')?.value){
      platform = "platform="+this.searchForm.get('platform')?.value;
    }
    
    const genre = this.searchForm.get('genre')?.value;
    const graphics = this.searchForm.get('graphics')?.value;
    const combat = this.searchForm.get('combat')?.value;
    const gameplay = this.searchForm.get('gameplay')?.value;
    const theme = this.searchForm.get('theme')?.value;
    const tags = this.searchForm.get('tags')?.value;
    const options = Object.assign({},genre,graphics,combat,gameplay,theme,tags)
    let tagsQuery = ""
    let selectedTags = []
    if(tags){
      for(const [key,value] of Object.entries(options)){
        if(value){
          selectedTags.push(key)
        }
      }
      if(selectedTags.length>0){
        tagsQuery+="tag="+selectedTags.join(".")
      }
    }
    
    const queryParams = {
      platform,
      tags,
    };
      this.freegameService.getFreegamesWithFilter(platform,tagsQuery).subscribe(freegames => {
        if(freegames != null){
          this.freegames = freegames;
        }else{
          this.freegames = []
        }
        
      });
  }
}
  