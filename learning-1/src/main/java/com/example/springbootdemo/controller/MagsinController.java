package com.example.springbootdemo.controller;

import com.example.springbootdemo.dao.ArticlesRepository;
import com.example.springbootdemo.dao.CommerciauxRepository;
import com.example.springbootdemo.dao.MagasinRepository;
import com.example.springbootdemo.dao.StockRepository;
import com.example.springbootdemo.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class MagsinController {
    @Autowired
    private MagasinRepository magasinRepository;
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private ArticlesRepository articlesRepository;
    @Autowired
    private CommerciauxRepository commerciauxRepository;

    @GetMapping(value = "/magasin")
    public List<Magasin> getMagasin(){
        return magasinRepository.findAll();
    }

    @PostMapping(value = "/magasinPost")
    public Boolean save(@RequestBody Magasin magasin){
        magasinRepository.save(magasin);
        List<Articles> articlesList = articlesRepository.findAll();
        for(int i = 0; i < articlesList.size(); i++){
            stockRepository.save(new Stock(null,articlesList.get(i).getId_article(),magasin.getId_magasin(), 0));
        }
        return true;
    }
    @DeleteMapping(value = "/magasinDelete/{id_magasin}")
    public Boolean delete(@PathVariable Long id_magasin){
        List<Stock> stocks = stockRepository.findByIdMagasin(id_magasin);
        for(int i = 0; i < stocks.size(); i++){
            stockRepository.delete(stocks.get(i));
        }
        magasinRepository.deleteById(id_magasin);
        return true;
    }

}
