package com.example.E_commerce.Platform.auth;


import com.example.E_commerce.Platform.entities.User;
import com.example.E_commerce.Platform.repositories.UserRepository;
import com.example.E_commerce.Platform.ws.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private UserRepository userRepository;
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));

    }
    @GetMapping("/me")
    public UserDto me(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return new UserDto(user.getId(), user.getFirstname(),user.getLastname(), user.getEmail(),user.getRole(),
                user.getVille(),user.getAddress(),user.getCodePostal());
    }

}
