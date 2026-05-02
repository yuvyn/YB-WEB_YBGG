package com.example.demo.API;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.ArmoryDto;
import com.example.demo.dto.CharacterSibling;

//LostArkApiClient.java
@Component
public class LostArkApiClient {

 private final WebClient webClient;

 @Value("${lostark.api.key}")
 private String apiKey;

 public LostArkApiClient(@Value("${lostark.api.base-url}") String baseUrl) {
     // 버퍼 크기를 10MB로 늘려줌
     ExchangeStrategies strategies = ExchangeStrategies.builder()
         .codecs(config ->
             config.defaultCodecs().maxInMemorySize(10 * 1024 * 1024) // 10MB
         )
         .build();

     this.webClient = WebClient.builder()
         .baseUrl(baseUrl)
         .defaultHeader("accept", "application/json")
         .exchangeStrategies(strategies)  // 여기 추가
         .build();
 }

 // 공통 GET 요청
 private <T> T get(String path, Class<T> type) {
     return webClient.get()
         .uri(path)
         .header("authorization", "Bearer " + apiKey)
         .retrieve()
         .bodyToMono(type)
         .block();
 }

 private <T> T get(String path, ParameterizedTypeReference<T> type) {
     return webClient.get()
         .uri(path)
         .header("authorization", "Bearer " + apiKey)
         .retrieve()
         .bodyToMono(type)
         .block();
 }

 // ── 캐릭터 ──────────────────────────────────────

 // 캐릭터 기본 정보 (보유 캐릭터 목록)
 public List<CharacterSibling> getCharacters(String characterName) {
	    return webClient.get()
	        .uri("/characters/" + encode(characterName) + "/siblings")
	        .header("authorization", "Bearer " + apiKey)
	        .retrieve()
	        .bodyToMono(new ParameterizedTypeReference<List<CharacterSibling>>() {})
	        .block();
	}

 // 캐릭터 프로필 (장비점수, 클래스, 서버 등)
 public Map<String, Object> getCharacterProfile(String characterName) {
     return get("/armories/characters/" + encode(characterName) + "/profiles",
         new ParameterizedTypeReference<>() {});
 }

 // 장비 정보
 public List<Map<String, Object>> getEquipment(String characterName) {
     return get("/armories/characters/" + encode(characterName) + "/equipment",
         new ParameterizedTypeReference<>() {});
 }

 // 각인
 public Map<String, Object> getEngravings(String characterName) {
     return get("/armories/characters/" + encode(characterName) + "/engravings",
         new ParameterizedTypeReference<>() {});
 }

 // 보석
 public Map<String, Object> getGems(String characterName) {
     return get("/armories/characters/" + encode(characterName) + "/gems",
         new ParameterizedTypeReference<>() {});
 }

 // 카드
 public Map<String, Object> getCards(String characterName) {
     return get("/armories/characters/" + encode(characterName) + "/cards",
         new ParameterizedTypeReference<>() {});
 }

 // 스킬
 public List<Map<String, Object>> getSkills(String characterName) {
     return get("/armories/characters/" + encode(characterName) + "/skills",
         new ParameterizedTypeReference<>() {});
 }

 // 캐릭터 전체 정보 한번에 (profiles + equipment + engravings + gems + cards + skills)
 public ArmoryDto getFullArmory(String characterName) {
	    return webClient.get()
	    		.uri(uriBuilder -> uriBuilder
	    			    .path("/armories/characters/" + encode(characterName))
	    			    .queryParam("filters", "profiles+equipment+engravings+gems+cards+skills")
	    			    .build())
	        .header("authorization", "Bearer " + apiKey)
	        .retrieve()
	        .bodyToMono(ArmoryDto.class)
	        .block();
	}

 // ── 랭킹 ──────────────────────────────────────

 public Map<String, Object> getRanking(String contentId, int page) {
     return get("/ranking/fields/" + contentId + "?page=" + page,
         new ParameterizedTypeReference<>() {});
 }

 // ── 게임 콘텐츠 ────────────────────────────────

 // 캘린더 (일정)
 public List<Map<String, Object>> getCalendar() {
     return get("/gamecontents/calendar",
         new ParameterizedTypeReference<>() {});
 }

 // 챌린지 어비스 던전
 public List<Map<String, Object>> getChallengeAbyss() {
     return get("/gamecontents/challenge-abyss-dungeons",
         new ParameterizedTypeReference<>() {});
 }

 // 챌린지 가디언
 public List<Map<String, Object>> getChallengeGuardian() {
     return get("/gamecontents/challenge-guardian-raids",
         new ParameterizedTypeReference<>() {});
 }

 // ── 시세 (거래소) ──────────────────────────────

 public Map<String, Object> getMarketItems(String query) {
     return webClient.post()
         .uri("/markets/items")
         .header("authorization", "Bearer " + apiKey)
         .header("Content-Type", "application/json")
         .bodyValue(Map.of(
             "Sort", "GRADE",
             "CategoryCode", 0,
             "ItemName", query,
             "PageNo", 1,
             "SortCondition", "DESC"
         ))
         .retrieve()
         .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
         .block();
 }

 // 거래소 카테고리 목록
 public List<Map<String, Object>> getMarketCategories() {
     return get("/markets/options",
         new ParameterizedTypeReference<>() {});
 }

 // ── 경매장 ─────────────────────────────────────

 public Map<String, Object> getAuctions(Map<String, Object> requestBody) {
     return webClient.post()
         .uri("/auctions/items")
         .header("authorization", "Bearer " + apiKey)
         .header("Content-Type", "application/json")
         .bodyValue(requestBody)
         .retrieve()
         .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
         .block();
 }

 // ── 뉴스 ──────────────────────────────────────

 public List<Map<String, Object>> getEvents() {
     return get("/news/events", new ParameterizedTypeReference<>() {});
 }

 public List<Map<String, Object>> getNotices() {
     return get("/news/notices", new ParameterizedTypeReference<>() {});
 }

 // URL 인코딩 유틸
 private String encode(String value) {
     return java.net.URLEncoder.encode(value, java.nio.charset.StandardCharsets.UTF_8);
 }
}