import { Data } from "./data.js"

export class Game 
{
    constructor(choices)
    {
        this.data = new Data();
        // Loop on choices key to target all default parameters
        Object.keys(choices).forEach(key =>{
            if(key == 'x')
            {
                this.data.x = choices[key];
            } 
            else if(key == 'y')
            {
                this.data.y = choices[key];
            }
            else if(key == 'colors')
            {
                // If there's only 1 parameter choose for colors key
                if(choices['colors'].length < 2)
                {
                    this.data.colors[0] = choices[key];
                    this.data.colors[1] = '#ffb000';
                } else 
                {
                    this.data.colors = [];
                    this.data.colors = choices[key];
                }
            }
        })
        this.container = document.getElementsByTagName('div')[0];

        // Create p to display players turn
        this.paragraph = document.createElement('p'); 
        this.container.appendChild(this.paragraph);
        this.paragraph.innerHTML = "Player 1 starts";

        // Create button replay/reset
        this.body = document.querySelector('body');
        this.button = document.createElement('button');
        this.body.appendChild(this.button);
        this.button.innerHTML = "Reset";

        // Button reloads page
        const btnReset = document.querySelector('button');

        btnReset.addEventListener('click', (event) => 
        {
            window.location.reload();
        });
        
        // Create table
        const table = document.createElement('table');
        this.container.appendChild(table);

        const tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        for(let i = 0; i < this.data.x; i++)
        {
            const tr = table.insertRow();
            for (let j = 0; j < this.data.y; j++) 
            {
                const td = tr.insertCell();
                const chip = document.createElement('span');

                // Add classes for columns and rows
                chip.classList.add('x' + j);
                chip.classList.add('y' + i);
                td.appendChild(chip);
            }
        }
    }

    players() 
    {
        this.data.player = 1;

        const span = document.querySelectorAll('span');
       
        span.forEach(element => {
            
            element.addEventListener('click', (event) => 
            {   
                // Gravity effect
                let column = document.querySelectorAll('.' + element.classList[0]);
                let backgroundColor = window.getComputedStyle(event.target).getPropertyValue('background-color');

                for(let i = 0; i < column.length; i++) 
                {
                    if(window.getComputedStyle(column[i]).getPropertyValue('background-color') == 'rgb(255, 255, 255)')
                    {
                        this.first = column[i];
                    } 
                }
                
                // Colors players + id players
                let row = document.querySelectorAll('.' + this.first.classList[1]);

                if(backgroundColor == 'rgb(255, 255, 255)')
                {
                    if(this.data.player == 1)
                    {
                        this.first.style.backgroundColor = this.data.colors[0];
                        this.first.id = 'player' + this.data.player;
                        this.victory(column, row);
                        this.data.player = 2;   
                        this.paragraph.innerHTML = 'Player n°' + this.data.player + ' your turn.';
                    }
                    else if(this.data.player == 2)
                    {
                        this.first.style.backgroundColor = this.data.colors[1];
                        this.first.id = 'player' + this.data.player;
                        this.victory(column, row);
                        this.data.player = 1;
                        this.paragraph.innerHTML = 'Player n°' + this.data.player + ' your turn.';
                    }
                }

                // Game over, draw
                for(let i = 0; i < (this.data.x * this.data.y); i++)
                {
                    if(backgroundColor !== 'rgb(255, 255, 255)' && this.victory(column, row) !== true)
                    {
                        alert('Game over, draw !');
                        return true;
                    }
                }
            })
        })
    }

    // Reset after game
    reset()
    {
        const span = document.querySelectorAll('span');
        span.forEach(element => {
            element.style.backgroundColor = 'rgb(255, 255, 255)';
            element.removeAttribute('id'); 
        })
    }

    victory(vertical, horizontal)
    {
        let count = 0;
        
        // Vertical case
        for(let i = 0; i < vertical.length; i++)
        {
            if(vertical[i].id == this.first.id)
            {
                count += 1;
            } else 
            {
                count = 0;
            }
            if (count == 4)
            {
                this.data.score[this.data.player-1] += 1;

                alert('Player n°' + this.data.player + ' wins !' + ' ' + this.data.score);               
                const replay = confirm('Want to play again ?');
                if(replay !== true)
                {                    
                    this.container.style.pointerEvents = 'none';
                }else 
                {
                    this.reset();
                    return true;
                }
            }
        }
        
        count = 0;
        
        // Horizontal case
        for(let i = 0; i < horizontal.length; i++)
        {
            if(horizontal[i].id == this.first.id)
            {
                count += 1;
            } else
            {
                count = 0;
            }
            if(count == 4)
            {
                this.data.score[this.data.player-1] += 1;

                alert('Player n°' + this.data.player + ' wins !' + ' ' + this.data.score);           
                const replay = confirm('Want to play again ?');
                if(replay !== true)
                {                    
                    this.container.style.pointerEvents = 'none';
                }else 
                {
                    this.reset();
                    return true;
                }
            }
        }
        
        count = 0;

        // Diagonals cases
        let indexX = Number((this.first.classList[0]).split('x')[1]);
        let indexY = Number((this.first.classList[1]).split('y')[1]);

        let diagArrayR = [];
        let antiDiagArrayR = [];
        let diagArrayL = [];
        let antiDiagArrayL = [];
        
        for (let i = 0; i < 7; i++) 
        {
            let newClassX = '.x' + (indexX + i); 
            let newClassY = '.y' + (indexY - i);
            let newClasses = document.querySelector(newClassX + newClassY);

            if(newClasses !== null)
            {
                diagArrayR.push(newClasses);
            }
           
            newClassX = '.x' + (indexX - i); 
            newClassY = '.y' + (indexY + i);
            newClasses = document.querySelector(newClassX + newClassY);

            if(newClasses !== null)
            {
                antiDiagArrayR.push(newClasses);
            }
            
            newClassX = '.x' + (indexX - i); 
            newClassY = '.y' + (indexY - i);
            newClasses = document.querySelector(newClassX + newClassY);

            if(newClasses !== null)
            {
                diagArrayL.push(newClasses);
            }
    
            newClassX = '.x' + (indexX + i); 
            newClassY = '.y' + (indexY + i);
            newClasses = document.querySelector(newClassX + newClassY);

            if(newClasses !== null)
            {
                antiDiagArrayL.push(newClasses);
            }
        }
        
        for(let i = 0; i < diagArrayR.length; i++)
        {   
            if(diagArrayR[i].id == this.first.id)
            {
                count += 1;
            } else
            {
                count = 0;
            }
            if(count == 4)
            {
                this.data.score[this.data.player-1] += 1;

                alert('Player n°' + this.data.player + ' wins !' + ' ' + this.data.score);               
                const replay = confirm('Want to play again ?');
                if(replay !== true)
                {                    
                    this.container.style.pointerEvents = 'none';
                }else 
                {
                    this.reset();
                    return true;
                }
            }
        }
        
        count = 0; 

        for(let i = 0; i < antiDiagArrayR.length; i++)
        {
            if(antiDiagArrayR[i].id == this.first.id)
            {
                count += 1;
            } else
            {
                count = 0;
            }
            if(count == 4)
            {
                this.data.score[this.data.player-1] += 1;

                alert('Player n°' + this.data.player + ' wins !' + ' ' + this.data.score);               
                const replay = confirm('Want to play again ?');
                if(replay !== true)
                {                    
                    this.container.style.pointerEvents = 'none';
                }else 
                {
                    this.reset();
                    return true;
                }
            }
        }

        count = 0;

        for(let i = 0; i < diagArrayL.length; i++)
        {
            if(diagArrayL[i].id == this.first.id)
            {
                count += 1;
            } else
            {
                count = 0;
            }
            if(count == 4)
            {
                this.data.score[this.data.player-1] += 1;

                alert('Player n°' + this.data.player + ' wins !' + ' ' + this.data.score);               
                const replay = confirm('Want to play again ?');
                if(replay !== true)
                {                    
                    this.container.style.pointerEvents = 'none';
                }else 
                {
                    this.reset();
                    return true;
                }            
            }
        }
        
        count = 0;
        
        for(let i = 0; i < antiDiagArrayL.length; i++)
        {
            if(antiDiagArrayL[i].id == this.first.id)
            {
                count += 1;
            } else
            {
                count = 0;
            }
            if(count == 4)
            {
                this.data.score[this.data.player-1] += 1;

                alert('Player n°' + this.data.player + ' wins !' + ' ' + this.data.score);               
                const replay = confirm('Want to play again ?');
                if(replay !== true)
                {                    
                    this.container.style.pointerEvents = 'none';
                }else 
                {
                    this.reset();
                    return true;
                }            
            }
        }
    }
}