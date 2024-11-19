package com.smartlink.scm.helpers;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(final String message) {
        super(message);
    }

    public ResourceNotFoundException() {
        super("Resource not found");
    }
}
