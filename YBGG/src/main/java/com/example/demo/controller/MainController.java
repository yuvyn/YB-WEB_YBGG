package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String main(Model model) {
        model.addAttribute("title", "메인 페이지");
        return "Main";
    }
    
    @GetMapping("/lostark")
    public String losstark(Model model) {
        model.addAttribute("title", "로스트아크");
        return "LostARK/lostark";
    }
    
    @GetMapping("/lostark_MOB")
    public String lostark_MOB(Model model) {
        model.addAttribute("title", "로스트아크 모바일");
        return "LostARK_MOB/lostark-mobile";
    }
    
    @GetMapping("/lostark/community")
    public String lostark_community(Model model) {
        model.addAttribute("title", "로스트아크");
        return "LostARK/lostark_community";
    }
}