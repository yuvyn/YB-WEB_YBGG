package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.API.LostArkApiClient;
import com.example.demo.dto.ArmoryDto;
import com.example.demo.dto.CharacterSibling;

@Service
public class LostArkService {

    private final LostArkApiClient apiClient;

    public LostArkService(LostArkApiClient apiClient) {
        this.apiClient = apiClient;
    }

    // 캐릭터 전체 정보
    public ArmoryDto getFullArmory(String characterName) {
        return apiClient.getFullArmory(characterName);
    }

    // 원정대 캐릭터 목록
    public List<CharacterSibling> getCharacters(String characterName) {
        return apiClient.getCharacters(characterName);
    }

    // 캘린더
    public List<Map<String, Object>> getCalendar() {
        return apiClient.getCalendar();
    }

    // 시세 검색
    public Map<String, Object> searchMarket(String itemName) {
        return apiClient.getMarketItems(itemName);
    }

    // 공지사항
    public List<Map<String, Object>> getNotices() {
        return apiClient.getNotices();
    }

    // 서버별 인구 통계
    public Map<String, Long> getServerPopulation() {
        return Map.of(
            "루페온", 750208L,
            "실리안", 549774L
        );
    }
}