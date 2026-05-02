package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.LostArkService;

// LostArkApiController.java
@RestController
@RequestMapping("/api/lostark")
public class LostArkApiController {

    private final LostArkService lostArkService;

    public LostArkApiController(LostArkService lostArkService) {
        this.lostArkService = lostArkService;
    }

    // 캐릭터 검색
    @GetMapping("/character/{name}")
    public ResponseEntity<?> searchCharacter(@PathVariable("name") String name) {
        return ResponseEntity.ok(lostArkService.getFullArmory(name));
    }

    // 원정대 캐릭터 목록
    @GetMapping("/character/{name}/siblings")
    public ResponseEntity<?> getSiblings(@PathVariable("name") String name) {
        return ResponseEntity.ok(lostArkService.getCharacters(name));
    }

    // 캘린더/일정
    @GetMapping("/calendar")
    public ResponseEntity<?> getCalendar() {
        return ResponseEntity.ok(lostArkService.getCalendar());
    }

    // 시세
    @GetMapping("/market")
    public ResponseEntity<?> getMarket(@RequestParam("q") String q) {
        return ResponseEntity.ok(lostArkService.searchMarket(q));
    }

    // 공지사항
    @GetMapping("/notices")
    public ResponseEntity<?> getNotices() {
        return ResponseEntity.ok(lostArkService.getNotices());
    }
}