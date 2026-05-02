package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
 
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CharacterSibling {

    @JsonProperty("ServerName")
    private String serverName;

    @JsonProperty("CharacterName")
    private String characterName;

    @JsonProperty("CharacterLevel")
    private int characterLevel;

    @JsonProperty("CharacterClassName")
    private String characterClassName;

    @JsonProperty("ItemAvgLevel")
    private String itemAvgLevel;

    // getter 직접 추가
    public String getServerName()        { return serverName; }
    public String getCharacterName()     { return characterName; }
    public int    getCharacterLevel()    { return characterLevel; }
    public String getCharacterClassName(){ return characterClassName; }
    public String getItemAvgLevel()      { return itemAvgLevel; }
}