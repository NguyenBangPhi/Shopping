package com.shop.service;

import java.io.File;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;

@Service
public interface Service_Upload {
	File save(MultipartFile file, String folder);
}