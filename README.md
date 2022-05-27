# FiveM-CoraUI
Library written in typescript to create menus on FiveM
Support LUA version

## Showcase

![image](https://user-images.githubusercontent.com/56686012/170692436-726b2506-15f8-44af-b5ea-ffd74c64e3b2.png)

## Example 

```
RegisterCommand('testMenu', function() 
    exports.coraui:CreateMenu({
        name = 'Feff',
        subtitle = 'Principal',
        glare = true,
        buttons = {
            { name = "Submenu uruspu", onClick = function()
                exports.coraui:CreateSubmenu("uruspu")
            end},

            { name = "Submenu sujuc", onClick = function()
                exports.coraui:CreateSubmenu("sujuc")
            end},

            { name = "Checkbox", checkbox = function(bool)
                print(bool)
            end},

            { name = "Rightlabel", rightText = "~g~260 000 $", onClick = function()

            end},

            { name = "Slider", onSlide = function(z)
                print("Button clicked  " .. z)
            end, slider = {"ananasikim", "sikimiyalla", "sitch"}},

            { name = "Close", onClick = function()
                exports.coraui:CloseMenu()
            end}
        },

        submenus = {
            ["uruspu"] = {
                name = "uruspu",
                subtitle = 'Secondaire 1',
                glare = true,
                buttons = {
                    { name = "uruspu1" },
                    { name = "uruspu2" }
                }
            },

            ["sujuc"] = {
                name = "sujuc",
                subtitle = 'Secondaire 2',
                glare = true,
                buttons = {
                    { name = "sujuc1" },
                    { name = "sujuc2" }
                }
            }
        }
    }) 
end)
```

## Requirements
- coraui (not rename/delete)
