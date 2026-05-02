package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArmoryDto {

    @JsonProperty("ArmoryProfile")   private ArmoryProfile   armoryProfile;
    @JsonProperty("ArmoryEquipment") private List<Equipment> armoryEquipment;
    @JsonProperty("ArmoryEngraving") private Engraving       armoryEngraving;
    @JsonProperty("ArmoryGem")       private Gem             armoryGem;
    @JsonProperty("ArmoryCard")      private Card            armoryCard;
    @JsonProperty("ArmorySkills")    private List<Skill>     armorySkills;

    public ArmoryProfile   getArmoryProfile()   { return armoryProfile; }
    public List<Equipment> getArmoryEquipment() { return armoryEquipment; }
    public Engraving       getArmoryEngraving() { return armoryEngraving; }
    public Gem             getArmoryGem()       { return armoryGem; }
    public Card            getArmoryCard()      { return armoryCard; }
    public List<Skill>     getArmorySkills()    { return armorySkills; }

    /* ── 프로필 ── */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ArmoryProfile {
        @JsonProperty("CharacterImage")     private String characterImage;
        @JsonProperty("CharacterName")      private String characterName;
        @JsonProperty("ServerName")         private String serverName;
        @JsonProperty("CharacterClassName") private String characterClassName;
        @JsonProperty("CharacterLevel")     private int    characterLevel;
        @JsonProperty("ItemAvgLevel")       private String itemAvgLevel;
        @JsonProperty("ExpeditionLevel")    private int    expeditionLevel;
        @JsonProperty("TownLevel")          private int    townLevel;
        @JsonProperty("GuildName")          private String guildName;
        @JsonProperty("PvpGradeName")       private String pvpGradeName;
        @JsonProperty("Stats")              private List<Stat> stats;

        public String     getCharacterImage()     { return characterImage; }
        public String     getCharacterName()      { return characterName; }
        public String     getServerName()         { return serverName; }
        public String     getCharacterClassName() { return characterClassName; }
        public int        getCharacterLevel()     { return characterLevel; }
        public String     getItemAvgLevel()       { return itemAvgLevel; }
        public int        getExpeditionLevel()    { return expeditionLevel; }
        public int        getTownLevel()          { return townLevel; }
        public String     getGuildName()          { return guildName; }
        public String     getPvpGradeName()       { return pvpGradeName; }
        public List<Stat> getStats()              { return stats; }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Stat {
            @JsonProperty("Type")  private String type;
            @JsonProperty("Value") private String value;
            public String getType()  { return type; }
            public String getValue() { return value; }
        }
    }

    /* ── 장비 ── */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Equipment {
        @JsonProperty("Type")  private String type;
        @JsonProperty("Name")  private String name;
        @JsonProperty("Icon")  private String icon;
        @JsonProperty("Grade") private String grade;

        public String getType()  { return type; }
        public String getName()  { return name; }
        public String getIcon()  { return icon; }
        public String getGrade() { return grade; }
    }

    /* ── 각인 ── */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Engraving {
        @JsonProperty("Engravings") private List<EngravingItem>   engravings;
        @JsonProperty("Effects")    private List<EngravingEffect> effects;

        public List<EngravingItem>   getEngravings() { return engravings; }
        public List<EngravingEffect> getEffects()    { return effects; }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class EngravingItem {
            @JsonProperty("Icon")        private String icon;
            @JsonProperty("Name")        private String name;
            @JsonProperty("Level")       private int    level;
            @JsonProperty("Description") private String description;

            public String getIcon()        { return icon; }
            public String getName()        { return name; }
            public int    getLevel()       { return level; }
            public String getDescription() { return description; }
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class EngravingEffect {
            @JsonProperty("Name")        private String name;
            @JsonProperty("Description") private String description;

            public String getName()        { return name; }
            public String getDescription() { return description; }
        }
    }

    /* ── 보석 ── */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Gem {
        @JsonProperty("Gems")    private List<GemItem>   gems;
        @JsonProperty("Effects") private List<GemEffect> effects;

        public List<GemItem>   getGems()    { return gems; }
        public List<GemEffect> getEffects() { return effects; }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class GemItem {
            @JsonProperty("Slot")  private int    slot;
            @JsonProperty("Name")  private String name;
            @JsonProperty("Icon")  private String icon;
            @JsonProperty("Level") private int    level;
            @JsonProperty("Grade") private String grade;

            public int    getSlot()  { return slot; }
            public String getName()  { return name; }
            public String getIcon()  { return icon; }
            public int    getLevel() { return level; }
            public String getGrade() { return grade; }
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class GemEffect {
            @JsonProperty("GemSlot")     private int    gemSlot;
            @JsonProperty("Name")        private String name;
            @JsonProperty("Description") private String description;
            @JsonProperty("Icon")        private String icon;

            public int    getGemSlot()     { return gemSlot; }
            public String getName()        { return name; }
            public String getDescription() { return description; }
            public String getIcon()        { return icon; }
        }
    }

    /* ── 카드 ── */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Card {
        @JsonProperty("Cards")   private List<CardItem>   cards;
        @JsonProperty("Effects") private List<CardEffect> effects;

        public List<CardItem>   getCards()   { return cards; }
        public List<CardEffect> getEffects() { return effects; }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class CardItem {
            @JsonProperty("Slot")       private int    slot;
            @JsonProperty("Name")       private String name;
            @JsonProperty("Icon")       private String icon;
            @JsonProperty("Grade")      private String grade;
            @JsonProperty("AwakeCount") private int    awakeCount;
            @JsonProperty("AwakeTotal") private int    awakeTotal;

            public int    getSlot()       { return slot; }
            public String getName()       { return name; }
            public String getIcon()       { return icon; }
            public String getGrade()      { return grade; }
            public int    getAwakeCount() { return awakeCount; }
            public int    getAwakeTotal() { return awakeTotal; }
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class CardEffect {
            @JsonProperty("Index") private int              index;
            @JsonProperty("Items") private List<EffectItem> items;

            public int              getIndex() { return index; }
            public List<EffectItem> getItems() { return items; }

            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class EffectItem {
                @JsonProperty("Name")        private String name;
                @JsonProperty("Description") private String description;

                public String getName()        { return name; }
                public String getDescription() { return description; }
            }
        }
    }

    /* ── 스킬 ── */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Skill {
        @JsonProperty("Name")     private String        name;
        @JsonProperty("Icon")     private String        icon;
        @JsonProperty("Level")    private int           level;
        @JsonProperty("Rune")     private Rune          rune;
        @JsonProperty("Tripods")  private List<Tripod>  tripods;

        public String       getName()    { return name; }
        public String       getIcon()    { return icon; }
        public int          getLevel()   { return level; }
        public Rune         getRune()    { return rune; }
        public List<Tripod> getTripods() { return tripods; }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Rune {
            @JsonProperty("Name")  private String name;
            @JsonProperty("Icon")  private String icon;
            @JsonProperty("Grade") private String grade;

            public String getName()  { return name; }
            public String getIcon()  { return icon; }
            public String getGrade() { return grade; }
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Tripod {
            @JsonProperty("Tier")       private int     tier;
            @JsonProperty("Slot")       private int     slot;
            @JsonProperty("Name")       private String  name;
            @JsonProperty("Icon")       private String  icon;
            @JsonProperty("Level")      private int     level;
            @JsonProperty("IsSelected") private boolean isSelected;
            @JsonProperty("IsActivated") private boolean isActivated;

            public int     getTier()        { return tier; }
            public int     getSlot()        { return slot; }
            public String  getName()        { return name; }
            public String  getIcon()        { return icon; }
            public int     getLevel()       { return level; }
            public boolean getIsSelected()  { return isSelected; }
            public boolean getIsActivated() { return isActivated; }
        }
    }
}