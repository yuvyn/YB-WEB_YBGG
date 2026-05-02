package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.API.LostArkApiClient;
import com.example.demo.dto.ArmoryDto;
import com.example.demo.dto.CharacterSibling;

// LostArkController.java  (기존 RestController와 별개)
@Controller
@RequestMapping("/lostark")
public class LostArkController {

    private final LostArkApiClient apiClient;

    public LostArkController(LostArkApiClient apiClient) {
        this.apiClient = apiClient;
    }

    // 홈
    @GetMapping
    public String home(Model model) {
        model.addAttribute("calendar", apiClient.getCalendar());
        model.addAttribute("notices", apiClient.getNotices());
        return "LostARK/lostark";
    }

    // 캐릭터 검색 결과 페이지
    @GetMapping("/character/{name}")
    public String character(@PathVariable("name") String name, Model model) {
        try {
        	ArmoryDto armory = apiClient.getFullArmory(name);
        	List<CharacterSibling> siblings = apiClient.getCharacters(name);

            model.addAttribute("armory",   armory);
            model.addAttribute("siblings", siblings);
            model.addAttribute("name",     name);

        } catch (Exception e) {
            model.addAttribute("error", "캐릭터를 찾을 수 없습니다.");
        }

        return "LostARK/lostark_character";
    }
}